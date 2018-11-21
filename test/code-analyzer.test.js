import assert from 'assert';
import {parseCode,bigfunc} from '../src/js/code-analyzer';

describe('The javascript parser', () => {

    it('1is parsing an empty function correctly', () => {
        assert.equal(
            bigfunc(parseCode('')),
            '<table border="1"><tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr></table>'
        );
    });

    it('1is parsing an function correctly', () => {
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

    it('1is parsing an function correctly', () => {
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

    it('1is parsing an function correctly', () => {
        assert.equal(
            bigfunc(parseCode('function b(r){\n' +
                '\n' +
                'x=m[c+1];\n' +
                'for(i=0;i<8;i++){}\n' +
                'for(i=0;i<8;i++)\n' +
                'x=-1;\n' +
                '\n' +
                'while(x>a){}\n' +
                'while(x>1)\n' +
                'x=8;\n' +
                '\n' +
                'return 1;\n' +
                'return a;\n' +
                'return a+b;\n' +
                'return m[c];\n' +
                '\n' +
                '}')),
            '<table border="1"><tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr><tr><td> 1 </td><td>function declaration</td><td>b</td><td>       </td><td> </td></tr><tr><td> 1 </td><td>VariableDeclarator</td><td>r</td><td>       </td><td> </td></tr><tr><td> 3 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>m[c+1]</td></tr><tr><td> 4 </td><td>ForStatement</td><td> </td><td>   i < 8   </td><td> </td></tr><tr><td> 5 </td><td>ForStatement</td><td> </td><td>   i < 8   </td><td> </td></tr><tr><td> 6 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>-1</td></tr><tr><td> 8 </td><td>WhileStatement</td><td> </td><td>   x>a   </td><td> </td></tr><tr><td> 9 </td><td>WhileStatement</td><td> </td><td>   x>1   </td><td> </td></tr><tr><td> 10 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>8</td></tr><tr><td> 12 </td><td>ReturnStatement</td><td> </td><td>       </td><td>1</td></tr><tr><td> 13 </td><td>ReturnStatement</td><td> </td><td>       </td><td>a</td></tr><tr><td> 14 </td><td>ReturnStatement</td><td> </td><td>       </td><td>a+b</td></tr><tr><td> 15 </td><td>ReturnStatement</td><td> </td><td>       </td><td>m[c]</td></tr></table>'
        );
    });

    it('1is parsing an function correctly', () => {
        assert.equal(
            bigfunc(parseCode('function b(r){\n' +
                'let x;\n' +
                'm[x]=2;\n' +
                'return -1;\n' +
                '}')),
            '<table border="1"><tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr><tr><td> 1 </td><td>function declaration</td><td>b</td><td>       </td><td> </td></tr><tr><td> 1 </td><td>VariableDeclarator</td><td>r</td><td>       </td><td> </td></tr><tr><td> 2 </td><td>VariableDeclarator</td><td>x</td><td>       </td><td> </td></tr><tr><td> 3 </td><td>AssignmentExpression</td><td>m[x]</td><td>       </td><td>2</td></tr><tr><td> 4 </td><td>ReturnStatement</td><td> </td><td>       </td><td>-1</td></tr></table>'
        );
    });


    it('1is parsing an function correctly', () => {
        assert.equal(
            bigfunc(parseCode('function b(r){\n' +
                'if(x>1){x=2;}\n' +
                'else if(x>2){x=3;}\n' +
                'else{x=2;}\n' +
                '}')),
            '<table border="1"><tr><td> Line </td><td> Type </td><td>Name</td><td>Condition</td><td>Value</td></tr><tr><td> 1 </td><td>function declaration</td><td>b</td><td>       </td><td> </td></tr><tr><td> 1 </td><td>VariableDeclarator</td><td>r</td><td>       </td><td> </td></tr><tr><td> 2 </td><td>IfStatement</td><td> </td><td>   x>1   </td><td></td></tr><tr><td> 2 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>2</td></tr><tr><td> 3 </td><td>Else if Statement</td><td> </td><td>   x>2   </td><td></td></tr><tr><td> 3 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>3</td></tr><tr><td> 3 </td><td>Else Statement</td><td> </td><td>       </td><td></td></tr><tr><td> 4 </td><td>AssignmentExpression</td><td>x</td><td>       </td><td>2</td></tr></table>'
        );
    });

    it('1is parsing an function correctly', () => {
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

    it('1is parsing an function correctly', () => {
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


});
