//webgl.js
var vertex_array =[
    0,0,0, //0
    0,0,100, //1
    0,100,0, //2
    0,100,100, //3
    100,0,0, //4
    100,0,100, //5
    100,100,0, //6
    100,100,100 //7
    ]
var triangles_array = [
    0,4,2,
    2,4,6,
    0,2,1,
    1,2,3,
    4,5,6,
    6,5,7,
    1,3,5,
    3,7,5,
    0,1,4,
    1,5,4,
    3,2,6,
    3,6,7
]
var interface_points = [
    20,10,100,
    20,80,100,
    80,20,100,
    80,80,100
]
var interface_text = [
    "Who am I?",
    "CV",
    "PortFolio",
    "Contact Me"
]
var field_of_view = 60;

var m4 = {

 perspective: function(fieldOfViewInRadians, aspect, near, far) {
    var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
    var rangeInv = 1.0 / (near - far);
 
    return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, near * far * rangeInv * 2, 0
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
   inverse: function(m) {
    var m00 = m[0 * 4 + 0];
    var m01 = m[0 * 4 + 1];
    var m02 = m[0 * 4 + 2];
    var m03 = m[0 * 4 + 3];
    var m10 = m[1 * 4 + 0];
    var m11 = m[1 * 4 + 1];
    var m12 = m[1 * 4 + 2];
    var m13 = m[1 * 4 + 3];
    var m20 = m[2 * 4 + 0];
    var m21 = m[2 * 4 + 1];
    var m22 = m[2 * 4 + 2];
    var m23 = m[2 * 4 + 3];
    var m30 = m[3 * 4 + 0];
    var m31 = m[3 * 4 + 1];
    var m32 = m[3 * 4 + 2];
    var m33 = m[3 * 4 + 3];
    var tmp_0  = m22 * m33;
    var tmp_1  = m32 * m23;
    var tmp_2  = m12 * m33;
    var tmp_3  = m32 * m13;
    var tmp_4  = m12 * m23;
    var tmp_5  = m22 * m13;
    var tmp_6  = m02 * m33;
    var tmp_7  = m32 * m03;
    var tmp_8  = m02 * m23;
    var tmp_9  = m22 * m03;
    var tmp_10 = m02 * m13;
    var tmp_11 = m12 * m03;
    var tmp_12 = m20 * m31;
    var tmp_13 = m30 * m21;
    var tmp_14 = m10 * m31;
    var tmp_15 = m30 * m11;
    var tmp_16 = m10 * m21;
    var tmp_17 = m20 * m11;
    var tmp_18 = m00 * m31;
    var tmp_19 = m30 * m01;
    var tmp_20 = m00 * m21;
    var tmp_21 = m20 * m01;
    var tmp_22 = m00 * m11;
    var tmp_23 = m10 * m01;

    var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
        (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
        (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
        (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
        (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

    var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

    return [
      d * t0,
      d * t1,
      d * t2,
      d * t3,
      d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
            (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
      d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
            (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
      d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
            (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
      d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
            (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
      d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
            (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
      d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
            (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
      d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
            (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
      d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
            (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
      d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
            (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
      d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
            (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
      d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
            (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
      d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
            (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
    ];
  },
  multiply_vector: function(a,b){
      return [a[0]*b[0]+a[4]*b[1]+a[8]*b[2]+a[12]*b[3],
             a[1]*b[0]+a[5]*b[1]+a[9]*b[2]+a[13]*b[3],
             a[2]*b[0]+a[6]*b[1]+a[10]*b[2]+a[14]*b[3],
             a[3]*b[0]+a[7]*b[1]+a[11]*b[2]+a[15]*b[3]
             ]
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
var trans = [-150,0,-360];
var scale = [1,1,1];

var change_rotation_x = function(x){
    angles[0] = x/50 * Math.PI;
    draw_scene();
}
var change_rotation_y = function(x){
    angles[1] = x/50 * Math.PI;
    draw_scene();
}
var change_rotation_z = function(x){
    angles[2] = x/50 * Math.PI;
    draw_scene();
}
var x_change_pos = function(x){
    trans[0] = x*2 -150;
    draw_scene();
}
var y_change_pos = function(y){
    trans[1] = -y*2;
    draw_scene();
}
var z_change_pos = function(y){
    trans[2] = -y-360;
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
var z_change_scale = function(y){
    scale[2] = y/20;
    draw_scene();
}
var change_field = function(y){
    field_of_view = y*180/100;
    draw_scene();
}
var deg_to_rad = function(val){
    return val * Math.PI/180;
}
var rad_cam_angle = 0;
var change_camera_angle = function(x){
    rad_cam_angle = deg_to_rad(x);
    draw_scene();
}

var draw_scene;
var canvas0;
var ctx_2d;


var main = function(){

    //Get Canvas
    canvas0 = document.getElementById("gl_canvas");

    var canvas1 = document.getElementById("D_canvas");
    canvas1.addEventListener("mousedown", click_on_canvas);
    document.addEventListener("mouseup",release_click);
    canvas1.addEventListener("mousemove",mouse_over_canvas);
    ctx_2d = canvas1.getContext("2d");
    
    //get webgl
    var gl = canvas0.getContext("webgl") || canvas0.getContext("experimental-webgl"); 
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

    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.FRONT);
    
    draw_scene = function(){
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.enable(gl.DEPTH_TEST);
	
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
        var size = 3;          // 3 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 3;
        
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var zNear = 1;
        var zFar = 2000;
        var projection_matrix = m4.perspective(deg_to_rad(field_of_view), aspect, zNear, zFar);
        var cameraMatrix = m4.xRotation(0);
        cameraMatrix = m4.xRotate(cameraMatrix,0.93);
        cameraMatrix = m4.translate(cameraMatrix, -90,-200,-0);

        var viewMatrix = m4.inverse(cameraMatrix);

        var matrix = m4.multiply(projection_matrix, viewMatrix); //viewProjectionMatrix

        var vector0 = [100,100,100,1];
        
        var pivot = [-100,50,-0];
        var worldmatrix = m4.translation(pivot[0],pivot[1],pivot[2]);
        worldmatrix = m4.zRotate(worldmatrix,angles[2]);
        worldmatrix = m4.translate(worldmatrix,-pivot[0],-pivot[1],-pivot[2]);
        worldmatrix = m4.translate(worldmatrix,trans[0],trans[1],trans[2]);
        
        matrix = m4.multiply(matrix,worldmatrix);
        
        var x = 0;
        for(var i=0;i<triangles_array.length;i+=3,x+=8/120)
        {

            var positions = [
                vertex_array[triangles_array[i]*3], vertex_array[triangles_array[i]*3+1], vertex_array[triangles_array[i]*3+2],
                vertex_array[triangles_array[i+1]*3], vertex_array[triangles_array[i+1]*3+1], vertex_array[triangles_array[i+1]*3+2],
                vertex_array[triangles_array[i+2]*3], vertex_array[triangles_array[i+2]*3+1], vertex_array[triangles_array[i+2]*3+2]
            ];



            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
            gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

            gl.uniform2f(resolutionUniformLocation,gl.canvas.width,gl.canvas.height);
            gl.uniform4f(colorUniformLocation,x,x,x,1);
            gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);

            gl.drawArrays(primitiveType, offset, count);
        }
        //get the coordinates of the interface points
        var clip_coords= [];
        var z_coords = [];
        var z_index = [];
        var tmp_coords = [];
        for(var i= 0;i<interface_points.length/3;++i){
            //console.log(interface_points[i*3]+" "+interface_points[i*3+1]+" "+interface_points[i*3+2]);
            var tmp = [interface_points[i*3],interface_points[i*3+1],interface_points[i*3+2],1];
            tmp = m4.multiply_vector(matrix,tmp);
            var j=0;
            for(; j< i && tmp[2]<z_coords[j];++j){
            }
            z_coords.splice(j,0,tmp[3]);
            z_index.splice(j,0,i);
            tmp_coords[i*2] = tmp[0]/tmp[3];
            tmp_coords[i*2+1] = tmp[1]/tmp[3];
        }
        console.log(z_index);
        for(var i=0;i<z_index.length;++i){
            clip_coords[i*2+0] = tmp_coords[z_index[i]*2+0];
            clip_coords[i*2+1] = tmp_coords[z_index[i]*2+1];
            
        }
        draw_interface(clip_coords,z_index);
    }
    draw_scene();
}

var line_magnitude=400;
var box_height = 35;
var box_width = 400;
var outer_pointer_size = 15;
var inner_pointer_size = 7;


var draw_interface = function(points_coords,z_index){
    ctx_2d.clearRect(0, 0, 1920,1080);
    ctx_2d.fillStyle = "#FFFFFF";
    var direction = [0.707,0.707];
    //ctx.font = "30px Arial";
    for(var i=0;i<points_coords.length/2;++i){
        //ctx_2d.fillRect((points_coords[i*2]+1)/2*canvas0.width,(1 - points_coords[i*2+1])/2*canvas0.height,50,50);
        ctx_2d.fillStyle = "#FFFFFF";
        ctx_2d.beginPath(); 
        ctx_2d.lineWidth = "3";
        ctx_2d.strokeStyle = "black"; // Green path
        var clippped_coords = [(points_coords[i*2]+1)/2*canvas0.width,(1 - points_coords[i*2+1])/2*canvas0.height];
        ctx_2d.moveTo( clippped_coords[0], clippped_coords[1]);
        ctx_2d.lineTo(clippped_coords[0]+direction[0]*line_magnitude, clippped_coords[1]-direction[1]*0.866*line_magnitude);
        ctx_2d.lineTo(clippped_coords[0]+direction[0]*line_magnitude + box_width, clippped_coords[1]-direction[1]*0.866*line_magnitude);
        ctx_2d.lineTo(clippped_coords[0]+direction[0]*line_magnitude + box_width - direction[0]*box_height, clippped_coords[1]-direction[1]*0.866*line_magnitude + direction[1]*box_height);
        ctx_2d.lineTo(clippped_coords[0]+direction[0]*line_magnitude - direction[0]*box_height - 4, clippped_coords[1]-direction[1]*0.866*line_magnitude + direction[1]*box_height);
        ctx_2d.stroke(); // Draw it
        ctx_2d.fill();
        
        ctx_2d.beginPath();
        ctx_2d.moveTo( clippped_coords[0] + outer_pointer_size, clippped_coords[1]);
        ctx_2d.lineTo(clippped_coords[0],clippped_coords[1] - outer_pointer_size );
        ctx_2d.lineTo( clippped_coords[0] - outer_pointer_size, clippped_coords[1]);
        ctx_2d.lineTo(clippped_coords[0],clippped_coords[1] + outer_pointer_size );
        ctx_2d.lineTo( clippped_coords[0] + outer_pointer_size + outer_pointer_size/10, clippped_coords[1] -outer_pointer_size/10);
        
        ctx_2d.lineWidth = "0";
        ctx_2d.stroke();
        ctx_2d.fill();
        
        ctx_2d.fillStyle = "#000000";
        
        ctx_2d.beginPath();
        ctx_2d.moveTo( clippped_coords[0] + inner_pointer_size, clippped_coords[1]);
        ctx_2d.lineTo(clippped_coords[0],clippped_coords[1] -  inner_pointer_size );
        ctx_2d.lineTo( clippped_coords[0] -  inner_pointer_size, clippped_coords[1]);
        ctx_2d.lineTo(clippped_coords[0],clippped_coords[1] +  inner_pointer_size );
        ctx_2d.lineTo( clippped_coords[0] +  inner_pointer_size+ inner_pointer_size/10 , clippped_coords[1] -inner_pointer_size/10);
        ctx_2d.lineWidth = "0";
        ctx_2d.stroke();
        ctx_2d.fill();
        //ctx_2d.fill();
        

        ctx_2d.font = "small-caps 33px Consolas";
        var text_point = [clippped_coords[0]+direction[0]*line_magnitude - direction[0]*box_height + 25, clippped_coords[1]-direction[1]*0.866*line_magnitude + direction[1]*box_height]
        ctx_2d.fillText(interface_text[z_index[i]], text_point[0], text_point[1]);
    }
}

var clicking = false;
var initial_click = [];
var angle_magnitude = 0;
var initial_angle = 0;
var mouse_over_canvas = function(e){
    if(!clicking)return;
    var magnitude = initial_click[0] - e.clientX;
    angle_magnitude = magnitude/canvas0.width * Math.PI * 2;
    angles[2] = initial_angle + angle_magnitude;
    draw_scene();
}
var click_on_canvas = function(e){
    clicking = true;
    initial_angle = angles[2];
    initial_click[0] = e.clientX;
    initial_click[1] = e.clientY;
    console.log("clicked");
    
}
var release_click = function(e){
     clicking=false;
    console.log("release");
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

