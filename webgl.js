//webgl.js
var vertex_array =[
    0,0,0, //0
    0,1000,0, //1
    100,100,0, //2
    100,0,0, //3
    1000,0,100, //4
    1000,1000,100, //5
    0,1000,100, //6
    0,0,100 //7
    ]
var triangles_array = [
    0,1,6,
    0,7,6,
    0,1,2,
    0,2,3,
    3,5,4,
    3,2,5,
    7,6,5,
    7,5,4,
    1,6,2,
    6,2,5,
    0,3,7,
    3,7,4
]

var m4 = {

  projection: function(width, height, depth) {
    // Note: This matrix flips the Y axis so 0 is at the top.
    return [
       2 / width, 0, 0, 0,
       0, -2 / height, 0, 0,
       0, 0, 2 / depth, 0,
      -1, 1, 0, 1,
    ];
  },

  multiply: function(a, b) {
    var a00 = a[0 * 4 + 0];
    var a01 = a[0 * 4 + 1];
    var a02 = a[0 * 4 + 2];
    var a03 = a[0 * 4 + 3];
    var a10 = a[1 * 4 + 0];
    var a11 = a[1 * 4 + 1];
    var a12 = a[1 * 4 + 2];
    var a13 = a[1 * 4 + 3];
    var a20 = a[2 * 4 + 0];
    var a21 = a[2 * 4 + 1];
    var a22 = a[2 * 4 + 2];
    var a23 = a[2 * 4 + 3];
    var a30 = a[3 * 4 + 0];
    var a31 = a[3 * 4 + 1];
    var a32 = a[3 * 4 + 2];
    var a33 = a[3 * 4 + 3];
    var b00 = b[0 * 4 + 0];
    var b01 = b[0 * 4 + 1];
    var b02 = b[0 * 4 + 2];
    var b03 = b[0 * 4 + 3];
    var b10 = b[1 * 4 + 0];
    var b11 = b[1 * 4 + 1];
    var b12 = b[1 * 4 + 2];
    var b13 = b[1 * 4 + 3];
    var b20 = b[2 * 4 + 0];
    var b21 = b[2 * 4 + 1];
    var b22 = b[2 * 4 + 2];
    var b23 = b[2 * 4 + 3];
    var b30 = b[3 * 4 + 0];
    var b31 = b[3 * 4 + 1];
    var b32 = b[3 * 4 + 2];
    var b33 = b[3 * 4 + 3];
    return [
      b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
      b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
      b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
      b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
      b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
      b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
      b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
      b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
      b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
      b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
      b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
      b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
      b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
      b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
      b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
      b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
    ];
  },

  translation: function(tx, ty, tz) {
    return [
       1,  0,  0,  0,
       0,  1,  0,  0,
       0,  0,  1,  0,
       tx, ty, tz, 1,
    ];
  },

  xRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
      1, 0, 0, 0,
      0, c, s, 0,
      0, -s, c, 0,
      0, 0, 0, 1,
    ];
  },

  yRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
      c, 0, -s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1,
    ];
  },

  zRotation: function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return [
       c, s, 0, 0,
      -s, c, 0, 0,
       0, 0, 1, 0,
       0, 0, 0, 1,
    ];
  },

  scaling: function(sx, sy, sz) {
    return [
      sx, 0,  0,  0,
      0, sy,  0,  0,
      0,  0, sz,  0,
      0,  0,  0,  1,
    ];
  },

  translate: function(m, tx, ty, tz) {
    return m4.multiply(m, m4.translation(tx, ty, tz));
  },

  xRotate: function(m, angleInRadians) {
    return m4.multiply(m, m4.xRotation(angleInRadians));
  },

  yRotate: function(m, angleInRadians) {
    return m4.multiply(m, m4.yRotation(angleInRadians));
  },

  zRotate: function(m, angleInRadians) {
    return m4.multiply(m, m4.zRotation(angleInRadians));
  },

  scale: function(m, sx, sy, sz) {
    return m4.multiply(m, m4.scaling(sx, sy, sz));
  },

};

var angles = [0,0,0];
var trans = [0,0,0];
var scale = [1,1,1];

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
var canvas0;
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
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(), gl.STATIC_DRAW);
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
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(), gl.STATIC_DRAW);
        //Tell the attribute how to get data out of the PositioBuffer
        var size = 3;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 3;
        
        var matrix = m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 400);
        //var matrix = m4.scaling( scale[0], scale[1], scale[2]); 
        matrix = m4.translate(matrix, trans[0], trans[1], trans[2]);
        matrix = m4.xRotate(matrix, angles[0]);
        matrix = m4.yRotate(matrix, angles[1]); 
        matrix = m4.zRotate(matrix, angles[2]); 
        matrix = m4.scale(matrix, scale[0], scale[1], scale[2]); 
        //console.log(matrix);
        

        /*for(var i=0;i<triangles_array.length;i+=3)
        {
            
            var positions = [
                vertex_array[triangles_array[i]],vertex_array[triangles_array[i]+1],vertex_array[triangles_array[i]+2],
                vertex_array[triangles_array[i+1]],vertex_array[triangles_array[i+1]+1],vertex_array[triangles_array[i+1]+2],
                vertex_array[triangles_array[i+2]],vertex_array[triangles_array[i+2]+1],vertex_array[triangles_array[i+2]+2]
            ];
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
            gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
            
            gl.uniform2f(resolutionUniformLocation,gl.canvas.width,gl.canvas.height);
            gl.uniform4f(colorUniformLocation,0.1,0.9,0.2,1);
            gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);
            
            gl.drawArrays(primitiveType, offset, count);
        }*/
        var positions0 = [vertex_array[0],vertex_array[1],vertex_array[2]
                          ,vertex_array[6],vertex_array[7],vertex_array[8],
                          vertex_array[9],vertex_array[10],vertex_array[11]];
        console.log(positions0);
        console.log(matrix);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions0), gl.STATIC_DRAW);
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
        
        gl.uniform2f(resolutionUniformLocation,gl.canvas.width,gl.canvas.height);
        gl.uniform4f(colorUniformLocation,0.1,0.9,0.2,1);
        gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);
        
        gl.drawArrays(primitiveType, offset, count);
    }
    draw_scene();
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

