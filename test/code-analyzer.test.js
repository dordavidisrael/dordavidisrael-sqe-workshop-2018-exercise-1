import assert from 'assert';
import {parseCode,bigfunc} from '../src/js/code-analyzer';

describe('The javascript parser', () => {

    it('1is parsing an empty function correctly', () => {
        assert.equal(
            bigfunc(parseCode('')),
            '<table border="1"><tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr></table>'
        );
    });

    it('2is parsing an function correctly', () => {
        assert.equal(
            bigfunc(parseCode('function b(){\n' +
                'let x=1;\n' +
                'let x=a;\n' +
                'let x=1+2+3+4+5;\n' +
                'let x=m[v]+2;\n' +
                'let x=-7;\n' +
                'let x=-m[v];\n' +
                'let x=-a;\n' +
                '}')),
            '<table border="1"><tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr><tr><td> 1 </td><td>function declaration</td><td>b</td><td>       </td><td> </td></tr><tr><td> 2 </td><td>VariableDeclarator</td><td>x</td><td>       </td><td>1</td></tr><tr><td> 3 </td><td>VariableDeclarator</td><td>x</td><td>       </td><td>a</td></tr><tr><td> 4 </td><td>VariableDeclarator</td><td>x</td><td>       </td><td>x=1+2+3+4+5</td></tr><tr><td> 5 </td><td>VariableDeclarator</td><td>x</td><td>       </td><td>x=m[v]+2</td></tr><tr><td> 6 </td><td>VariableDeclarator</td><td>x</td><td>       </td><td>-7</td></tr><tr><td> 7 </td><td>VariableDeclarator</td><td>x</td><td>       </td><td>-m[v]</td></tr><tr><td> 8 </td><td>VariableDeclarator</td><td>x</td><td>       </td><td>-a</td></tr></table>'
        );
    });

    it('3is parsing an function correctly', () => {
        assert.equal(
            bigfunc(parseCode('function b(x){\n' +
                'x=1;\n' +
                'x=a;\n' +
                'x=1+2+3;\n' +
                'x=m[v];\n' +
                'x=m[v+1];\n' +
                'x=-7;\n' +
                'x=-m[v];\n' +
                'x=-m[1];\n' +
                'x=-m[v+1];\n' +
                '}')),
            '<table border="1"><tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr><tr><td> 1 </td><td>function declaration</td><td>b</td><td>       </td><td> </td></tr><tr><td> 1 </td><td>VariableDeclarator</td><td>x</td><td>       </td><td> </td></tr><tr><td> 2 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>1</td></tr><tr><td> 3 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>a</td></tr><tr><td> 4 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>x=1+2+3;</td></tr><tr><td> 5 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>m[v]</td></tr><tr><td> 6 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>m[v+1]</td></tr><tr><td> 7 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>-7</td></tr><tr><td> 8 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>-m[v]</td></tr><tr><td> 9 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>-m[1]</td></tr><tr><td> 10 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>-m[v+1]</td></tr></table>'
        );
    });

    it('4is parsing an function correctly', () => {
        assert.equal(
            bigfunc(parseCode('function b(){\n' +
                'for(i=0;i<a;i++){}\n' +
                'for(i=0;i<m[v];i++){}\n' +
                'for(i=0;i<a;i++)\n' +
                'x=a;\n' +
                '\n' +
                'while(x>a){}\n' +
                'while(x>1)\n' +
                'x=2;\n' +
                'return 1;\n' +
                'return a;\n' +
                'return -1;\n' +
                '}')),
            '<table border="1"><tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr><tr><td> 1 </td><td>function declaration</td><td>b</td><td>       </td><td> </td></tr><tr><td> 2 </td><td>ForStatement</td><td> </td><td>   i=0; i < a; i++   </td><td> </td></tr><tr><td> 3 </td><td>ForStatement</td><td> </td><td>   i=0; i < m[v]; i++   </td><td> </td></tr><tr><td> 4 </td><td>ForStatement</td><td> </td><td>   i=0; i < a; i++   </td><td> </td></tr><tr><td> 5 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>a</td></tr><tr><td> 7 </td><td>WhileStatement</td><td> </td><td>   x>a   </td><td> </td></tr><tr><td> 8 </td><td>WhileStatement</td><td> </td><td>   x>1   </td><td> </td></tr><tr><td> 9 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>2</td></tr><tr><td> 10 </td><td>ReturnStatement</td><td> </td><td>       </td><td>1</td></tr><tr><td> 11 </td><td>ReturnStatement</td><td> </td><td>       </td><td>a</td></tr><tr><td> 12 </td><td>ReturnStatement</td><td> </td><td>       </td><td>-1</td></tr></table>'
        );
    });

    it('5is parsing an function correctly', () => {
        assert.equal(
            bigfunc(parseCode('function b(r){\n' +
                'let x;\n' +
                'm[x]=2;\n' +
                'return -1;\n' +
                '}')),
            '<table border="1"><tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr><tr><td> 1 </td><td>function declaration</td><td>b</td><td>       </td><td> </td></tr><tr><td> 1 </td><td>VariableDeclarator</td><td>r</td><td>       </td><td> </td></tr><tr><td> 2 </td><td>VariableDeclarator</td><td>x</td><td>       </td><td> </td></tr><tr><td> 3 </td><td>AssignmentExpression</td><td>m[x]</td><td>       </td><td>2</td></tr><tr><td> 4 </td><td>ReturnStatement</td><td> </td><td>       </td><td>-1</td></tr></table>'
        );
    });


    it('6is parsing an function correctly', () => {
        assert.equal(
            bigfunc(parseCode('function b(r){\n' +
                'if(x>1){x=2;}\n' +
                'else if(x>2){x=3;}\n' +
                'else{x=2;}\n' +
                '}')),
            '<table border="1"><tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr><tr><td> 1 </td><td>function declaration</td><td>b</td><td>       </td><td> </td></tr><tr><td> 1 </td><td>VariableDeclarator</td><td>r</td><td>       </td><td> </td></tr><tr><td> 2 </td><td>IfStatement</td><td> </td><td>   x>1   </td><td></td></tr><tr><td> 2 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>2</td></tr><tr><td> 3 </td><td>Else if Statement</td><td> </td><td>   x>2   </td><td></td></tr><tr><td> 3 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>3</td></tr><tr><td> 3 </td><td>Else Statement</td><td> </td><td>       </td><td></td></tr><tr><td> 4 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>2</td></tr></table>'
        );
    });

    it('7is parsing an function correctly', () => {
        assert.equal(
            bigfunc(parseCode('function b(r){\n' +
                'if(x>1)\n' +
                'x=2;\n' +
                '\n' +
                'if(x>10){}\n' +
                'else if(x>11)\n' +
                'x=12;\n' +
                '\n' +
                'if(x>3){}\n' +
                'else if(x>4){x=5;}\n' +
                'else\n' +
                'x=6\n' +
                '}')),
            '<table border="1"><tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr><tr><td> 1 </td><td>function declaration</td><td>b</td><td>       </td><td> </td></tr><tr><td> 1 </td><td>VariableDeclarator</td><td>r</td><td>       </td><td> </td></tr><tr><td> 2 </td><td>IfStatement</td><td> </td><td>   x>1   </td><td></td></tr><tr><td> 3 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>2</td></tr><tr><td> 5 </td><td>IfStatement</td><td> </td><td>   x>10   </td><td></td></tr><tr><td> 6 </td><td>Else if Statement</td><td> </td><td>   x>11   </td><td></td></tr><tr><td> 7 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>12</td></tr><tr><td> 9 </td><td>IfStatement</td><td> </td><td>   x>3   </td><td></td></tr><tr><td> 10 </td><td>Else if Statement</td><td> </td><td>   x>4   </td><td></td></tr><tr><td> 10 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>5</td></tr><tr><td> 11 </td><td>Else Statement</td><td> </td><td>       </td><td></td></tr><tr><td> 12 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>6</td></tr></table>'
        );
    });

    it('8is parsing an function correctly', () => {
        assert.equal(
            bigfunc(parseCode('function b(){\n' +
                '\n' +
                'x=-(a+b+c+d);\n' +
                '\n' +
                'if(x>1){}\n' +
                'else{x=2;}\n' +
                'if(x>3){}\n' +
                'else if(x>4){}\n' +
                'else if(x>5){}\n' +
                'else if(x>6){}\n' +
                'else{x=7;}\n' +
                '}')),
            '<table border="1"><tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr><tr><td> 1 </td><td>function declaration</td><td>b</td><td>       </td><td> </td></tr><tr><td> 3 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>-a+b+c+d</td></tr><tr><td> 5 </td><td>IfStatement</td><td> </td><td>   x>1   </td><td></td></tr><tr><td> 5 </td><td>Else Statement</td><td> </td><td>       </td><td></td></tr><tr><td> 6 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>2</td></tr><tr><td> 7 </td><td>IfStatement</td><td> </td><td>   x>3   </td><td></td></tr><tr><td> 8 </td><td>Else if Statement</td><td> </td><td>   x>4   </td><td></td></tr><tr><td> 9 </td><td>Else if Statement</td><td> </td><td>   x>5   </td><td></td></tr><tr><td> 10 </td><td>Else if Statement</td><td> </td><td>   x>6   </td><td></td></tr><tr><td> 10 </td><td>Else Statement</td><td> </td><td>       </td><td></td></tr><tr><td> 11 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>7</td></tr></table>'
        );
    });

    it('9is parsing an function correctly', () => {
        assert.equal(
            bigfunc(parseCode('function b(x=2){\n' +
                'let x=1;\n' +
                '}')),
            '<table border="1"><tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr><tr><td> 1 </td><td>function declaration</td><td>b</td><td>       </td><td> </td></tr><tr><td> 2 </td><td>VariableDeclarator</td><td>x</td><td>       </td><td>1</td></tr></table>'
        );
    });

    it('10is parsing an function correctly', () => {
        assert.equal(
            bigfunc(parseCode('function b(){\n' +
                'm[x]=-8;\n' +
                'm[x]=m[i];\n' +
                '}')),
            '<table border="1"><tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr><tr><td> 1 </td><td>function declaration</td><td>b</td><td>       </td><td> </td></tr><tr><td> 2 </td><td>AssignmentExpression</td><td>m[x]</td><td>       </td><td>-8</td></tr><tr><td> 3 </td><td>AssignmentExpression</td><td>m[x]</td><td>       </td><td>m[i]</td></tr></table>'
        );
    });

    it('11 is parsing an function correctly', () => {
        assert.equal(
            bigfunc(parseCode('function b(){\n' +
                'let x=i++;\n' +
                'm[j]=x++;\n' +
                '}')),
            '<table border="1"><tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr><tr><td> 1 </td><td>function declaration</td><td>b</td><td>       </td><td> </td></tr><tr><td> 2 </td><td>VariableDeclarator</td><td>x</td><td>       </td><td>i++</td></tr><tr><td> 3 </td><td>AssignmentExpression</td><td>m[j]</td><td>       </td><td>x++</td></tr></table>'
        );
    });


    it('12 is parsing an function correctly', () => {
        assert.equal(
            bigfunc(parseCode('function b(){\n' +
                '\n' +
                'x++;;\n' +
                'x=m[i]++;\n' +
                'x=a++;\n' +
                '\n' +
                '}')),
            '<table border="1"><tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr><tr><td> 1 </td><td>function declaration</td><td>b</td><td>       </td><td> </td></tr><tr><td> 3 </td><td>UpdateExpression</td><td>x</td><td>       </td><td>x++</td></tr><tr><td> 4 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>m[i]++</td></tr><tr><td> 5 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>a++</td></tr></table>'
        );
    });

    it('13 is parsing an function correctly', () => {
        assert.equal(
            bigfunc(parseCode('function b(){\n' +
                'return m[x];\n' +
                'return (a+b);\n' +
                'return -2;\n' +
                '\n' +
                'for(;i<8;){}\n' +
                '}')),
            '<table border="1"><tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr><tr><td> 1 </td><td>function declaration</td><td>b</td><td>       </td><td> </td></tr><tr><td> 2 </td><td>ReturnStatement</td><td> </td><td>       </td><td>m[x]</td></tr><tr><td> 3 </td><td>ReturnStatement</td><td> </td><td>       </td><td>a+b</td></tr><tr><td> 4 </td><td>ReturnStatement</td><td> </td><td>       </td><td>-2</td></tr><tr><td> 6 </td><td>ForStatement</td><td> </td><td>   ; i < 8;    </td><td> </td></tr></table>'
        );
    });

    it('5is parsing an function correctly', () => {
        assert.equal(
            bigfunc(parseCode('function b(){\n' +
                'let a = 1;\n' +
                'a.forEach(function(entry) {\n' +
                '    console.log(entry);\n' +
                '});\n' +
                '\n' +
                '}')),
            '<table border="1"><tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr><tr><td> 1 </td><td>function declaration</td><td>b</td><td>       </td><td> </td></tr><tr><td> 2 </td><td>VariableDeclarator</td><td>a</td><td>       </td><td>1</td></tr></table>'
        );
    });
});
