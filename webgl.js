//webgl.js
var positions0 = [
    30,30,
    100,30,
    30,100,

];
var positions1 = [
    100,30,
    30,100,
    100,100
    
];
var m3 = {
      translation: function(tx, ty) {
        return [
          1, 0, 0,
          0, 1, 0,
          tx, ty, 1,
        ];
      },
     
      rotation: function(angleInRadians) {
        var c = Math.cos(angleInRadians);
        var s = Math.sin(angleInRadians);
        return [
          c,-s, 0,
          s, c, 0,
          0, 0, 1,
        ];
      },
     
      scaling: function(sx, sy) {
        return [
          sx, 0, 0,
          0, sy, 0,
          0, 0, 1,
        ];
      },
    multiply: function(a, b) {
    var a00 = a[0 * 3 + 0];
    var a01 = a[0 * 3 + 1];
    var a02 = a[0 * 3 + 2];
    var a10 = a[1 * 3 + 0];
    var a11 = a[1 * 3 + 1];
    var a12 = a[1 * 3 + 2];
    var a20 = a[2 * 3 + 0];
    var a21 = a[2 * 3 + 1];
    var a22 = a[2 * 3 + 2];
    var b00 = b[0 * 3 + 0];
    var b01 = b[0 * 3 + 1];
    var b02 = b[0 * 3 + 2];
    var b10 = b[1 * 3 + 0];
    var b11 = b[1 * 3 + 1];
    var b12 = b[1 * 3 + 2];
    var b20 = b[2 * 3 + 0];
    var b21 = b[2 * 3 + 1];
    var b22 = b[2 * 3 + 2];
    return [
      b00 * a00 + b01 * a10 + b02 * a20,
      b00 * a01 + b01 * a11 + b02 * a21,
      b00 * a02 + b01 * a12 + b02 * a22,
      b10 * a00 + b11 * a10 + b12 * a20,
      b10 * a01 + b11 * a11 + b12 * a21,
      b10 * a02 + b11 * a12 + b12 * a22,
      b20 * a00 + b21 * a10 + b22 * a20,
      b20 * a01 + b21 * a11 + b22 * a21,
      b20 * a02 + b21 * a12 + b22 * a22,
    ];
  },
};

var angle = 0;
var trans = [0,0];
var scale = [1,1];

var change_rotation = function(x){
    angle = x/50 * Math.PI;
    draw_scene();
}
var x_change_pos = function(x){
    trans[0] = x/100 * canvas0.width;
    draw_scene();
}
var y_change_pos = function(y){
    trans[1] = y/100 * canvas0.height;
    draw_scene();
}
var x_change_scale = function(x){
    scale[0] = x/20;
    draw_scene();
}
var y_change_scale = function(y){
    scale[1] = y/20;
    draw_scene();
}

var draw_scene;
var canvas0
var main = function(){

    //Get Canvas
    canvas0 = document.getElementById("my_canvas");
    //get webgl
    var gl = canvas0.getContext("webgl") || canvas.getContext("experimental-webgl"); 
    if(!gl){
        alert("Your browser or device is not compatible with webl");
    }
    //Get the code in the main index which consist in a basic vertex shader
    var vertexShaderSource = document.getElementById("2d-vertex-shader").text; 
    //Get the code in the main index which consist in a basic fragment shader
    var fragmentShaderSource = document.getElementById("2d-fragment-shader").text; 
     //Create Vertex shader
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    //Create Fragment Shader
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    //Create Program unifying
    var program = createProgram(gl,vertexShader,fragmentShader);
    
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    var resolutionUniformLocation = gl.getUniformLocation(program,"u_resolution");
    var colorUniformLocation = gl.getUniformLocation(program,"main_color");
    var matrixUniformLocation = gl.getUniformLocation(program,"u_matrix");
    var positionBuffer = gl.createBuffer();
    //WebGl let us manipulate webGL resources on global bind points
    //First we bind a resource to a bind point
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    //Now we can enter data refering to the bind point
    //we refer to our bind point, create a compatible binary array by copy that webgl can work with
    //gl.STATIC_DRAW says we are not going to change the data much("STATIC")
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions0), gl.STATIC_DRAW);
    //We need set to the Display size our size in the html
    //webgl-utils.resizeCanvasToDisplaySize(gl.canvas);
    //This tells WebGl the -1 to +1 clip space maps to 0 gl.canvas.width and height
    draw_scene = function(){
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        //Tell it to use my programm
        gl.useProgram(program);
        //Enable positionAttributeLocation "a_position"
        gl.enableVertexAttribArray(positionAttributeLocation);
        //Bind the buffer again after enabled a_poistion
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions0), gl.STATIC_DRAW);
        //Tell the attribute how to get data out of the PositioBuffer
        var size = 2;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        //this tells atributtes of the variables 
        //It Binds positionAttributeLocation to ARRAY_BUFFER 
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
        gl.uniform2f(resolutionUniformLocation,gl.canvas.width,gl.canvas.height);
        gl.uniform4f(colorUniformLocation,0.1,0.9,0.2,1);
        var translationMatrix = m3.translation(trans[0],trans[1]);
        var rotationMatrix = m3.rotation(angle);
        var scaleMatrix = m3.scaling(scale[0],scale[1]);
        
         var matrix = m3.multiply(translationMatrix, rotationMatrix);
        matrix = m3.multiply(matrix, scaleMatrix);
        
        gl.uniformMatrix3fv(matrixUniformLocation, false, matrix);
        // draw
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 3;
        gl.drawArrays(primitiveType, offset, count);
        gl.uniform4f(colorUniformLocation,0.4,0.7,0.5,1);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions1), gl.STATIC_DRAW);
         gl.drawArrays(primitiveType, offset, count);
    }
        draw_scene();
    //draw_scene();
}

var createShader = function(gl, type, source){
    //Create Shader of type (vertex || Fragment("IN MY CODE")) 
    var shader= gl.createShader(type); 
     //Use the code that we gave it to create the shader code
    gl.shaderSource(shader,source);
     //Compile the shader code 
    gl.compileShader(shader);
    //Check if the code was compiled succesfully
    var succes = gl.getShaderParameter(shader,gl.COMPILE_STATUS); 
    if(succes){
        return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    //Garbage
    gl.deleteShader(shader); 
}
var createProgram = function(gl,vertexShader, fragmentShader){
    //Create Program 
    var program = gl.createProgram();
    //Add vertex shader to the program
    gl.attachShader(program, vertexShader);
    //Add fragment shader to the program
    gl.attachShader(program, fragmentShader);
    //Unify shader and fragment shader
    gl.linkProgram(program);
    //Check if it was succesfully unified
    var succes = gl.getProgramParameter(program,gl.LINK_STATUS);
    if(succes){
        return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}
main();
