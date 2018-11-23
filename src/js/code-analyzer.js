import * as esprima from 'esprima';
let q='';
let zzzfff=0;

/* start*/

const bigfunc = (parsedCode)=>{
    q=q.split('\n');
    let arrLine=[],arrtype=[],arrName=[],arrCondition=[], arrValue=[];
    let z=parsedCode.body;
    let str = '';
    if((!(z.length===0))&&z[0].type === 'FunctionDeclaration') {
        let body1 = z[0].body.body;
        funcdecl(z, arrtype, arrName, arrLine, arrCondition, arrValue);
        let params = z[0].params;
        TakeCareParams(params, arrtype, arrName, arrLine, arrCondition, arrValue);
        ParseThebody(body1, arrtype, arrName, arrLine, arrCondition, arrValue);
        let x = makeAtable(str, arrLine, arrtype, arrName, arrCondition, arrValue);
        return x;}
    else {
        ParseThebody(z, arrtype, arrName, arrLine, arrCondition, arrValue);
        return  makeAtable(str, arrLine, arrtype, arrName, arrCondition, arrValue);
    }
};

const updata = ()=>{zzzfff=zzzfff+1;};

/*take care of Expresion statement*/
const StateExpression=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    if(entry.expression.type==='CallExpression'){updata();}
    else if(entry.expression.type==='UpdateExpression'){UpdatExp(entry,arrtype,arrName,arrLine,arrCondition,arrValue);}
    else if(entry.expression.right.type==='Literal'){Literal1(entry,arrtype,arrName,arrLine,arrCondition,arrValue);}
    else if(entry.expression.right.type==='Identifier'){identifier1(entry,arrtype,arrName,arrLine,arrCondition,arrValue);}
    else{StateExpression1(entry,arrtype,arrName,arrLine,arrCondition,arrValue);}
};
const StateExpression1=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    if(entry.expression.right.type==='MemberExpression'){MemberExp1(entry,arrtype,arrName,arrLine,arrCondition,arrValue);}
    if(entry.expression.right.type==='BinaryExpression'){Bin(entry,arrtype,arrName,arrLine,arrCondition,arrValue);}
    if(entry.expression.right.type==='UnaryExpression'){unaryExp1(entry,arrtype,arrName,arrLine,arrCondition,arrValue);}
    if(entry.expression.right.type==='UpdateExpression'){UpdatExp1(entry,arrtype,arrName,arrLine,arrCondition,arrValue);}
};

const UpdatExp=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    arrtype.push(entry.expression.type);
    let n=getName(entry.expression.argument);
    arrName.push(n);
    arrLine.push(entry.expression.loc.start.line);
    arrCondition.push(' ');
    arrValue.push(upd(entry,n));
};
const UpdatExp1=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    arrtype.push(entry.expression.type);
    let n=getName(entry.expression.left);
    arrName.push(n);
    arrLine.push(entry.expression.loc.start.line);
    arrCondition.push(' ');
    arrValue.push(upd1(entry));
};
const Literal1=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    arrtype.push(entry.expression.type);
    arrName.push(getName(entry.expression.left));
    arrLine.push(entry.expression.loc.start.line);
    arrCondition.push(' ');
    arrValue.push(TakeCareLiteral(entry.expression.right));
};
const identifier1=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    arrtype.push(entry.expression.type);
    arrName.push(getName(entry.expression.left));
    arrLine.push(entry.expression.loc.start.line);
    arrCondition.push(' ');
    arrValue.push(TakeCareIden(entry.expression.right));
};
const MemberExp1 =(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    let s='';
    s=TakeCareMemberC(entry.expression.right);
    arrtype.push(entry.expression.type);
    arrName.push(getName(entry.expression.left));
    arrLine.push(entry.expression.loc.start.line);
    arrCondition.push(' ');
    arrValue.push(s);
};
const unaryExp1=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    arrtype.push(entry.expression.type);
    arrName.push(getName(entry.expression.left));
    arrLine.push(entry.expression.loc.start.line);
    arrCondition.push(' ');
    arrValue.push(TakeCareUnary(entry.expression.right,arrtype,arrName,arrLine,arrCondition,arrValue));
};
const Bin=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    arrtype.push(entry.expression.type);
    arrName.push(getName(entry.expression.left));
    arrLine.push(entry.expression.loc.start.line);
    arrCondition.push(' ');
    arrValue.push(kobeBraynt(entry));
};
const upd=(entry,n)=>{
    return n+entry.expression.operator;
};
const upd1=(entry)=>{
    let s=BigTakeCare1(entry.expression.right.argument);
    return s+entry.expression.right.operator;
};

const TakeCareLiteral=(entry)=>{return entry.value;};
const TakeCareIden=(entry)=>{return entry.name;};
const TakeCareUnary=(entry)=>{
    let e=entry;
    if(e.argument.type==='Literal'){return e.operator+TakeCareLiteral(e.argument);}
    else if(e.argument.type==='Identifier'){return e.operator+TakeCareIden(e.argument);}
    else if(e.argument.type==='BinaryExpression'){return e.operator+kobeBraynt(e.argument);}
    else if(e.argument.type==='MemberExpression'){return e.operator+TakeCareMemberC(e.argument);}
};
const TakeCareMemberC=(entry)=>{
    let s='';
    s=BigTakeCare(entry.object);
    s=s+'[';
    s=s+BigTakeCare(entry.property);
    s=s+']';
    return s;
};
const BigTakeCare=(x)=>{
    if(x.type==='Identifier'){return TakeCareIden(x);}
    if(x.type==='Literal'){return TakeCareLiteral(x);}
    if(x.type==='BinaryExpression'){return kobeBraynt(x);}
};
const BigTakeCare1=(x)=>{
    if(x.type==='Identifier'){return TakeCareIden(x);}
    if(x.type==='MemberExpression'){return TakeCareMemberC(x);}
};



/*take care of let statement*/
const StateVariableDeclaration=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    entry.declarations.forEach(function(element) {
        if((!(element.init))){justlet(element,arrtype,arrName,arrLine,arrCondition,arrValue);}
        else if(element.init.type==='Literal'){vdLiteral1(element,arrtype,arrName,arrLine,arrCondition,arrValue);}
        else if(element.init.type==='Identifier'){vdidentifier1(element,arrtype,arrName,arrLine,arrCondition,arrValue);}
        else {StateVariableDeclaration1(element,entry,arrtype,arrName,arrLine,arrCondition,arrValue);}
    });
};
const StateVariableDeclaration1=(element,entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    if((element.init.type === 'BinaryExpression')) {vdBin(element, arrtype, arrName, arrLine, arrCondition, arrValue);}
    if(element.init.type==='UnaryExpression'){vdunaryExp1(element,arrtype,arrName,arrLine,arrCondition,arrValue);}
    if(element.init.type==='UpdateExpression'){UpdatExp11(element,arrtype,arrName,arrLine,arrCondition,arrValue);}

};
const UpdatExp11=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    arrtype.push(entry.type);
    let n=getName(entry.id);
    arrName.push(n);
    arrLine.push(entry.loc.start.line);
    arrCondition.push(' ');
    arrValue.push(upd11(entry));
};

const justlet=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    arrtype.push(entry.type);
    arrName.push(entry.id.name);
    arrLine.push(entry.loc.start.line);
    arrCondition.push(' ');
    arrValue.push(' ');
};
const vdLiteral1=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    arrtype.push(entry.type);
    arrName.push(getName(entry.id));
    arrLine.push(entry.loc.start.line);
    arrCondition.push(' ');
    arrValue.push(TakeCareLiteral(entry.init));
};
const vdidentifier1=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    arrtype.push(entry.type);
    arrName.push(getName(entry.id));
    arrLine.push(entry.loc.start.line);
    arrCondition.push(' ');
    arrValue.push(TakeCareIden(entry.init));
};
const vdunaryExp1=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    arrtype.push(entry.type);
    arrName.push(getName(entry.id));
    arrLine.push(entry.loc.start.line);
    arrCondition.push(' ');
    arrValue.push(TakeCareUnary(entry.init,arrtype,arrName,arrLine,arrCondition,arrValue));
};
const vdBin=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    arrtype.push(entry.type);
    arrName.push(getName(entry.id));
    arrLine.push(entry.loc.start.line);
    arrCondition.push(' ');
    arrValue.push(kobeBraynt(entry));
};
const upd11=(entry)=>{
    let s=BigTakeCare1(entry.init.argument);
    return s+entry.init.operator;
};

//****************************************************************************************\\
/*take care of IF statement*/
const StateIf=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    firstif(entry,arrtype,arrName,arrLine,arrCondition,arrValue);
    if(entry.alternate) {
        RecElseIf(entry.alternate, arrtype, arrName, arrLine, arrCondition, arrValue);
    }
};

const firstif=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    let s=kobeBraynt(entry.test);
    arrtype.push(entry.type);
    arrName.push(' ');
    arrLine.push(entry.test.left.loc.start.line);
    arrValue.push('');
    arrCondition.push(s);

    if(entry.consequent.body){ParseThebody(entry.consequent.body,arrtype,arrName,arrLine,arrCondition,arrValue);}
    //else if here down
    else{
        //(entry.consequent.expression){ check if lior is smolani
        let a=[];
        a.push(entry.consequent);
        ParseThebody(a,arrtype,arrName,arrLine,arrCondition,arrValue);
    }
};
const RecElseIf=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    if(entry.type==='IfStatement') {
        justEllseif(entry, arrtype, arrName, arrLine, arrCondition, arrValue);
        if (entry.alternate) {
            if (entry.alternate.type === 'IfStatement'){RecElseIf(entry.alternate, arrtype, arrName, arrLine, arrCondition, arrValue);}
            else {
                justElse(entry.alternate, arrtype, arrName, arrLine, arrCondition, arrValue);
            }
        }
    }
    else {
        justElse(entry, arrtype, arrName, arrLine, arrCondition, arrValue);
    }
};
const justElse=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    arrtype.push('Else Statement');
    arrName.push(' ');
    arrLine.push(entry.loc.start.line-1);
    arrValue.push('');
    arrCondition.push(' ');
    let a=[];
    if(entry.type==='BlockStatement') {
        ParseThebody(entry.body, arrtype, arrName, arrLine, arrCondition, arrValue);
    }
    else{
        a.push(entry);
        ParseThebody(a, arrtype, arrName, arrLine, arrCondition, arrValue);
    }
};
const justEllseif=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    let s=kobeBraynt(entry.test);
    arrtype.push('Else if Statement');
    arrName.push(' ');
    arrLine.push(entry.loc.start.line);
    arrValue.push('');
    arrCondition.push(s);
    if(entry.consequent.type==='BlockStatement') {
        ParseThebody(entry.consequent.body, arrtype, arrName, arrLine, arrCondition, arrValue);
    }

    else{
        let a=[];
        a.push(entry.consequent);
        ParseThebody(a, arrtype, arrName, arrLine, arrCondition, arrValue);
    }

};

//****************************************************************************************\\


//****************************************************************************************\\
/*take care about while and for*/
const  Statewhile=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=> {
    let s=Statewhile1(entry);
    arrtype.push(entry.type);
    arrName.push(' ');
    arrLine.push(entry.loc.start.line);
    arrValue.push(' ');
    arrCondition.push(s);
    if(entry.body.body){ParseThebody(entry.body.body,arrtype,arrName,arrLine,arrCondition,arrValue);}
    else{
        let a=[];
        a.push(entry.body);
        ParseThebody(a,arrtype,arrName,arrLine,arrCondition,arrValue);
    }
};
const Statewhile1=(entry)=> {
    if (entry.test.type === 'BinaryExpression') {
        return kobeBraynt(entry.test);
    }
};
//****************************************************************************************\\

//****************************************************************************************\\
/*take care about while and for*/
const Statefor=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    let s=Statewhile1(entry);
    s=stateforHelp(entry);
    arrtype.push(entry.type);
    arrName.push(' ');
    arrLine.push(entry.loc.start.line);
    arrValue.push(' ');
    arrCondition.push(s);
    if(entry.body.body) {
        ParseThebody(entry.body.body, arrtype, arrName, arrLine, arrCondition, arrValue);
    }
    else{let a=[];
        a.push(entry.body);
        ParseThebody(a, arrtype, arrName, arrLine, arrCondition, arrValue);
    }
};
const stateforHelp=(entry)=>{
    let s=Statewhile1(entry)+';';
    let a='';
    if(entry.init){a=q[entry.init.loc.start.line-1].substring(entry.init.loc.start.column,entry.init.loc.end.column);}
    a=a+';';
    let c='';
    if(entry.update){c=q[entry.update.loc.start.line-1].substring(entry.update.loc.start.column,entry.update.loc.end.column);}
    return a+' '+s+' '+c;
};


//****************************************************************************************\\

//****************************************************************************************\\
/*take care about return*/
const StateRetrun=(entry,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    let s=StateRetrun1(entry,arrtype,arrName,arrLine,arrCondition,arrValue);
    arrtype.push(entry.type);
    arrName.push(' ');
    arrLine.push(entry.loc.start.line);
    arrValue.push(s);
    arrCondition.push(' ');

};
const StateRetrun1=(entry)=>{
    if(entry.argument.type==='Identifier'){return TakeCareIden(entry.argument);}
    else if(entry.argument.type==='UnaryExpression'){return TakeCareUnary(entry.argument);}
    else if(entry.argument.type==='Literal'){return TakeCareLiteral(entry.argument);}
    else {return StateReturn2(entry);}
};
const StateReturn2=(entry)=>{
    if(entry.argument.type==='BinaryExpression'){return kobeBraynt(entry.argument);}
    if(entry.argument.type==='MemberExpression'){return TakeCareMemberC(entry.argument);}
};
//****************************************************************************************\\


//****************************************************************************************\\
/*GeneralFunc*/
const parseCode = (codeToParse) => {
    q=codeToParse;
    return esprima.parseScript(codeToParse,{loc:true});
};
const funcdecl=(z,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    arrtype.push('function declaration');arrName.push(z[0].id.name);arrLine.push(z[0].loc.start.line);arrCondition.push(' ');arrValue.push(' ');
};
const ParseThebody=(body1,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    body1.forEach(function(entry) {
        if(entry.type==='VariableDeclaration'){StateVariableDeclaration(entry,arrtype,arrName,arrLine,arrCondition,arrValue);}
        else if(entry.type==='ExpressionStatement'){StateExpression(entry,arrtype,arrName,arrLine,arrCondition,arrValue);}
        else if(entry.type==='IfStatement'){ StateIf(entry,arrtype,arrName,arrLine,arrCondition,arrValue);}
        else if(entry.type==='WhileStatement'){Statewhile(entry,arrtype,arrName,arrLine,arrCondition,arrValue);}
        else{ParseThebody2(entry,body1,arrtype,arrName,arrLine,arrCondition,arrValue);}
    });
};
const ParseThebody2=(entry,body1,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    if(entry.type==='ForStatement'){Statefor(entry,arrtype,arrName,arrLine,arrCondition,arrValue);}
    if(entry.type==='ReturnStatement'){ StateRetrun(entry,arrtype,arrName,arrLine,arrCondition,arrValue);}
};
const makeAtable= (str,arrLine,arrtype,arrName,arrCondition, arrValue)=>{
    str='<table border="1">';
    str=str+'<tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr>';
    for(let i=0;i<arrLine.length;i++){
        str=str+'<tr><td> '+arrLine[i]+' </td><td>'+arrtype[i]+'</td><td>'+arrName[i]+'</td><td>   '+arrCondition[i].replace('<',' < ')+'   </td><td>'+arrValue[i]+'</td></tr>';
    }
    str=str+'</table>';
    return str;

};
const TakeCareParams=(params,arrtype,arrName,arrLine,arrCondition,arrValue)=>{
    params.forEach(function(entry) {
        if(entry.type==='Identifier'){
            arrtype.push('VariableDeclarator');
            arrName.push(entry.name);
            arrLine.push(entry.loc.start.line);
            arrCondition.push(' ');
            arrValue.push(' ');
        }
        /*
        else if(entry.type==='AssignmentPattern'){
            arrtype.push('VariableDeclarator');
            arrName.push(entry.left.name);
            arrLine.push(entry.left.loc.start.line);
            arrCondition.push(' ');
            arrValue.push(entry.right.value);
        }
        */
    });
};
const getName=(x)=>{
    if(x.type==='Identifier'){return TakeCareIden(x);}
    else {return TakeCareMemberC(x);}
};
const kobeBraynt=(entry)=>{
    return q[entry.loc.start.line-1].substring(entry.loc.start.column,entry.loc.end.column);
};
//****************************************************************************************\\



export {bigfunc};
export {parseCode};
