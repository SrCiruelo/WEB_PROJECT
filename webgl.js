"use strict";
//CLASSES
class dic{
    constructor(){
        this.n = 0;
        this.key = [];
    }
    add_key(){
        this.key[this.n] = [];
        ++this.n;
    }
    add_val(index,val){
        this.key[index].add(val);
    }
    insert_arr(index,val){
        this.key[index] = val;
    }
    get_key(index){
        return this.key[index];
    }
};
//Math Functions
function lerp (start, end, amt){
  return (1-amt)*start+amt*end
}
var deg_to_rad = function(val){
    return val * Math.PI/180;
}
//GEOMETRY VARIABLES
var vertex_array = [];
var triangles_array = [];
/*vertex_array[11094*3]*50,vertex_array[11094*3+1]*50,vertex_array[11094*3+2]*50,
vertex_array[9368*3]*50,vertex_array[9368*3+1]*50,vertex_array[9368*3+2]*50,
vertex_array[7092*3]*50,vertex_array[7092*3+1]*50,vertex_array[7092*3+2]*50,
vertex_array[3003*3]*50,vertex_array[3003*3+1]*50,vertex_array[3003*3+2]*50*/
var interface_points = [
    79.455,11.98,175.53,
    -96.33500000000001,-15.604999999999999,169.55,
    14.085,-38.555,181.44,
    -72.69,53.144999999999996,166.62
]

function normalize(v) {
      var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      // make sure we don't divide by 0.
      if (length > 0.00001) {
        return [v[0] / length, v[1] / length, v[2] / length];
      } else {
        return [0, 0, 0];
      }
 }
function cross(a, b) {
      return [a[1] * b[2] - a[2] * b[1],
              a[2] * b[0] - a[0] * b[2],
              a[0] * b[1] - a[1] * b[0]];
}
function subtractVectors(a, b) {
      return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}
function vectorLerp(a,b,t){
      return [a[0]*(1-t) + b[0]*t,a[1]*(1-t) + b[1]*t,a[2]*(1-t) + b[2]*t,1];
}
var m4 = {
 lookAt: function(cameraPosition, target, up) {
    var zAxis = normalize(
        subtractVectors(cameraPosition, target));
    var xAxis = normalize(cross(up, zAxis));
    var yAxis = normalize(cross(zAxis, xAxis));

    return [
       xAxis[0], xAxis[1], xAxis[2], 0,
       yAxis[0], yAxis[1], yAxis[2], 0,
       zAxis[0], zAxis[1], zAxis[2], 0,
       cameraPosition[0],
       cameraPosition[1],
       cameraPosition[2],
       1,
    ];
 },
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
  multiply_vector: function(a,vector){
      return [a[0]*vector[0]+a[4]*vector[1]+a[8]*vector[2]+a[12]*vector[3],
             a[1]*vector[0]+a[5]*vector[1]+a[9]*vector[2]+a[13]*vector[3],
             a[2]*vector[0]+a[6]*vector[1]+a[10]*vector[2]+a[14]*vector[3],
             a[3]*vector[0]+a[7]*vector[1]+a[11]*vector[2]+a[15]*vector[3]
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

var rad_cam_angle = 0;
var field_of_view = 60;
var default_camera_x_angle = 0.93;
var camera_angle = default_camera_x_angle;

var camera_offset = [
    -40,-40,40
];
var default_transform_camera =[
    -90 - camera_offset[0],-200 - camera_offset[1],100 - camera_offset[2]
];
var transform_camera =[
    default_transform_camera[0],default_transform_camera[1],
    default_transform_camera[2]
];
var default_camera_y_axis = [
    0,0.54,0.81
];
var camera_y_axis = [
    default_camera_y_axis[0] ,default_camera_y_axis[1],
    default_camera_y_axis[2]
];
/*vertex_array[723*3]*50,vertex_array[723*3+1]*50,vertex_array[723*3+2]*50,1*/
var default_camera_target = [3.11,0.9450000000000001,189.07,1];
var camera_target = [ default_camera_target[0],
default_camera_target[0],default_camera_target[2],1];

//CHANGE TO BARYCENTRIC
var baricentric_coords = [
    1,0,0,
    0,1,0,
    0,0,1
]
//INTERFACE VARIABLES
var points_coords = [];
var interface_text = [
    "Who am I?",
    "CV",
    "PortFolio",
    "Contact Me"
]
var html_id = [
  "WhoamI",
  "CV",
  "PortFolio",
    "ContactMe"
];
var interface_description = [
    "Hello, I'm Miguel I'm a videogame developer",
    "Videogame Development student and programmer mainly of computational graphics",
    "Here there it is a collection of all the videogames and code I've made",
    "I have GitHub, Email and Twitter"
]
var line_magnitude=400;
var box_height = 35;
var dialogue_box_height = 100;
var box_width = 350;
var dialogue_box_width = 500;
var dialogue_box_margin = 10;
var outer_pointer_size = 15;
var inner_pointer_size = 7;
var transition_vel = 0.15;
var divided_text;
var main_text_font = "small-caps 33px Consolas";
var font_size = 18;
var description_text_font = "normal "+font_size+"px Consolas";
//COLLISION VARS
var colliding_box = [-1,0]; //colliding_box[0] = index of the colliding box
//Colliding_Box[1] = t of the interpolation for the transition when colliding
var clicking = false;
var initial_click = [];
var angle_magnitude = 0;
var initial_angle = 0;
var hit_pos = [];
//3D transitions variables
var rot_speed = 0.008;
var cam_trans_speed = 0.1;
var positions_to_index = []
//CONTEXT VARIABLES
var draw_scene;
var canvas0;
var ctx_2d;
//EVENTS
var mouse_over_canvas = function(e){

    if(doing_transition)return;
    hit_pos = [e.clientX*canvas0.width/canvas0.clientWidth ,e.clientY*canvas0.height/canvas0.clientHeight];



    if(!clicking)return;

    var magnitude = initial_click[0] - hit_pos[0];
    angle_magnitude = magnitude/canvas0.width * Math.PI * 2;
    angles[2] = initial_angle + angle_magnitude;
}
var click_on_canvas = function(e){
    if(doing_transition)return;
    clicking = true;
    initial_click = [e.clientX*canvas0.width/canvas0.clientWidth ,e.clientY*canvas0.height/canvas0.clientHeight];
    if(check_all_collisions(initial_click)){
        transition_index = positions_to_index[colliding_box[0]];
        colliding_box[0]= -1;
        doing_transition=true;
    }
    initial_angle = angles[2];

}
var release_click = function(e){
     clicking=false;
}
//CHECK_COLISIONS FUNCTION
var check_collisions= function(box_coords,real_width,real_height,click_point,diag_height){

    var i=0;
    for(;i<box_coords.length/2 &&
        (click_point[0]<box_coords[i*2] || click_point[0]>(box_coords[i*2]+real_width) ||
        click_point[1]  >box_coords[i*2+1]+ diag_height ||
         click_point[1]<box_coords[i*2+1] - real_height)
        ;++i){
    }
    var hitted = i<box_coords.length/2;

    if(hitted && colliding_box[0]!=i){
        colliding_box[0] = i;
        colliding_box[1] = 0;
    }
    else if(!hitted){
        colliding_box[0] = -1;
    }
    return hitted;
}

var check_all_collisions = function(){

    var is_on_box = colliding_box[0]!=-1;

    if(is_on_box){
        check_collisions(points_coords,dialogue_box_width ,box_height,hit_pos,dialogue_box_height);
        return true;
    }
    else{
        var collided = check_collisions(points_coords,box_width ,box_height,hit_pos,0);
        return collided;
    }
}
//No overload functions allowed in javascript
var check_click_collision = function(click_pos){
    var is_on_box = colliding_box[0]!=-1;
    if(is_on_box){
        return true;
    }
    else{
        var collided = check_collisions(points_coords,box_width ,box_height,click_pos,0);
        return collided;
    }
}
//DIVIDE TEXT FUNCTION
var divide_text = function(my_text){
    ctx_2d.font = description_text_font;
    var t_total = 0;
    var tmp = [];
    var slice_i = 0;
    for(var i=0; i<my_text.length;++i){
        t_total += ctx_2d.measureText(my_text.charAt(i)).width;
        if(t_total>dialogue_box_width - dialogue_box_margin*2){
            for(; i>0 && my_text.charAt(i)!=' ';--i){

            }
            tmp.push(my_text.slice(slice_i,i));
            t_total = 0;
            slice_i = ++i;
        }
    }
    tmp.push(my_text.slice(slice_i,my_text.length));
    return tmp;
}
//DRAW_INTERFACE
var draw_interface = function(points_coords,z_index){
    positions_to_index = z_index;
    ctx_2d.clearRect(0, 0, 1920,1080);

    var direction = [0.707,0.707];
    var clipped_coords = [0,0];

    ctx_2d.fillStyle = "#FFFFFF";
    if(doing_transition){
        line_magnitude = line_magnitude*(1-t) + t*800;
    }
    for(var i=0;i<points_coords.length/2;++i){
        //Asigna Dirección en base a su posición en x así que se inclina
        direction[0] = points_coords[i*2] * 1.7;

        ctx_2d.fillStyle = "#FFFFFF";
        ctx_2d.beginPath();
        ctx_2d.lineWidth = "3";
        ctx_2d.strokeStyle = "black"; // Green path

        clipped_coords[0] = (points_coords[i*2]+1)/2*canvas0.width;
        clipped_coords[1] = (1 - points_coords[i*2+1])/2*canvas0.height;

        window.points_coords[i*2] = clipped_coords[0]+direction[0]*line_magnitude - direction[0]*box_height - 4;
        window.points_coords[i*2+1] = clipped_coords[1] -direction[1]*0.866*line_magnitude + direction[1]*box_height;

        ctx_2d.moveTo( clipped_coords[0], clipped_coords[1]);
        ctx_2d.lineTo(clipped_coords[0]+direction[0]*line_magnitude, clipped_coords[1]-direction[1]*0.866*line_magnitude);
        ctx_2d.lineTo(clipped_coords[0]+direction[0]*line_magnitude + box_width, clipped_coords[1]-direction[1]*0.866*line_magnitude);
        ctx_2d.lineTo(clipped_coords[0]+direction[0]*line_magnitude + box_width - direction[0]*box_height, clipped_coords[1]-direction[1]*0.866*line_magnitude + direction[1]*box_height);
        ctx_2d.lineTo(clipped_coords[0]+direction[0]*line_magnitude - direction[0]*box_height , clipped_coords[1]-direction[1]*0.866*line_magnitude + direction[1]*box_height);
        ctx_2d.stroke(); // Draw it
        ctx_2d.fill();

        ctx_2d.beginPath();
        ctx_2d.moveTo( clipped_coords[0] + outer_pointer_size, clipped_coords[1]);
        ctx_2d.lineTo(clipped_coords[0],clipped_coords[1] - outer_pointer_size );
        ctx_2d.lineTo( clipped_coords[0] - outer_pointer_size, clipped_coords[1]);
        ctx_2d.lineTo(clipped_coords[0],clipped_coords[1] + outer_pointer_size );
        ctx_2d.lineTo( clipped_coords[0] + outer_pointer_size + outer_pointer_size/10, clipped_coords[1] -outer_pointer_size/10);

        ctx_2d.lineWidth = "0";
        ctx_2d.stroke();

        ctx_2d.fillStyle = "#000000";

        ctx_2d.beginPath();
        ctx_2d.moveTo( clipped_coords[0] + inner_pointer_size, clipped_coords[1]);
        ctx_2d.lineTo(clipped_coords[0],clipped_coords[1] -  inner_pointer_size );
        ctx_2d.lineTo( clipped_coords[0] -  inner_pointer_size, clipped_coords[1]);
        ctx_2d.lineTo(clipped_coords[0],clipped_coords[1] +  inner_pointer_size );
        ctx_2d.lineTo( clipped_coords[0] +  inner_pointer_size+ inner_pointer_size/10 , clipped_coords[1] -inner_pointer_size/10);
        ctx_2d.lineWidth = "0";
        ctx_2d.stroke();
        ctx_2d.fill();
        //ctx_2d.fill();


        ctx_2d.font = main_text_font;
        var text_point = [clipped_coords[0]+direction[0]*line_magnitude - direction[0]*box_height + 25, clipped_coords[1]-direction[1]*0.866*line_magnitude + direction[1]*box_height]
        ctx_2d.fillText(interface_text[z_index[i]], text_point[0], text_point[1]);
    }

    var col_index = colliding_box[0];
     if(col_index != -1){

         ctx_2d.fillStyle = "#9E9E9E";

         ctx_2d.font = description_text_font;

        clipped_coords[0] = (points_coords[col_index*2]+1)/2*canvas0.width +points_coords[col_index*2]*1.7*line_magnitude - points_coords[col_index*2]*1.7*box_height;

        clipped_coords[1] = (1 - points_coords[col_index*2+1])/2*canvas0.height
            -direction[1]*0.866*line_magnitude + direction[1]*box_height +2;



        ctx_2d.fillRect(clipped_coords[0],clipped_coords[1],dialogue_box_width,
                        dialogue_box_height*colliding_box[1]);
         //This needs to get changed is the font size is changed
         var text_height = font_size + 2;
         var sliced_text = divided_text.get_key(z_index[col_index]);

         ctx_2d.fillStyle = "#000000";
         for(var i=0;i<sliced_text.length;++i,text_height+=font_size){
             ctx_2d.fillText(sliced_text[i],clipped_coords[0]+dialogue_box_margin
                             ,clipped_coords[1] + text_height);
         }

        colliding_box[1] += (colliding_box[1] <= 1)?transition_vel:0;
    }
}
//HAY QUE RECOLOCAR ESTAS VARIABLES
var doing_transition = false;
var t = 0;
var speed = 2;
var transition_index = 0;

var change_state = function(index){
    if (!doing_transition || index==transition_index) return;

    var pos_point = [interface_points[ transition_index*3+0],interface_points[ transition_index*3+1],
      interface_points[ transition_index*3+2],1];
    var pivot = [-100,50,-0];
    var worldmatrix = m4.translation(pivot[0],pivot[1],pivot[2]);
    worldmatrix = m4.zRotate(worldmatrix,angles[2]);
    worldmatrix = m4.translate(worldmatrix,-pivot[0],-pivot[1],-pivot[2]);
    worldmatrix = m4.translate(worldmatrix,trans[0],trans[1],trans[2]);

    default_camera_target = pos_point;
    default_transform_camera = m4.multiply_vector(worldmatrix,pos_point);
    transition_index = index;
    t=0;
}
//ESTAS FUNCIONES SE EJECUTAN MÁS DE UNA VEZ
var is_displaying = false;
var display_css = function(){
  if(is_displaying)return;
  display_menu(html_id[transition_index]);
  is_displaying = true;
}
var stop_display_css = function(){
  if(!is_displaying)return;
  hide_menu();
  is_displaying = false;
}
//UPDATE EVERY 20 miliseconds get executed
var Update = function(){
    //#if mouse over something draw_scene()
    //#else rotate
    if(doing_transition){
        if(t<=1){
          t += speed*speed/100;
          draw_scene();
          stop_display_css();
          return;
        }
        else {
          display_css();
        }
    }
    var is_on_box = check_all_collisions();
    if(is_on_box){
        check_collisions(points_coords,dialogue_box_width ,box_height,hit_pos,dialogue_box_height);
    }
    else{
        var collided = check_collisions(points_coords,box_width ,box_height,hit_pos,0);

        if(!clicking){
          angles[2] += rot_speed;
        }
        else if(camera_angle<=Math.PI){
            camera_angle = lerp(camera_angle,Math.PI/2,cam_trans_speed);
        }
    }
    draw_scene();
}
//SHADERS DECLARATIONS
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
//OPTIMIZED MAIN FUNCTION
//NEED TO COMMENT
var main = function(){

    //Get Canvas
    canvas0 = document.getElementById("gl_canvas");

    var canvas1 = document.getElementById("D_canvas");
    var body = document.getElementById("body");
    body.addEventListener("mousedown", click_on_canvas);
    body.addEventListener("mouseup",release_click);
    body.addEventListener("mousemove",mouse_over_canvas);
    ctx_2d = canvas1.getContext("2d");


    var gl = canvas0.getContext("webgl") || canvas0.getContext("experimental-webgl");
    if(!gl){
        alert("Your browser or device is not compatible with webl");
    }

    var vertexShaderSource = document.getElementById("2d-vertex-shader").text;

    var fragmentShaderSource = document.getElementById("2d-fragment-shader").text;

    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);

    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    var program = createProgram(gl,vertexShader,fragmentShader);

    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    var barycentricAttributeLocation = gl.getAttribLocation(program, "b_position");
    var resolutionUniformLocation = gl.getUniformLocation(program,"u_resolution");
    var colorUniformLocation = gl.getUniformLocation(program,"main_color");
    var matrixUniformLocation = gl.getUniformLocation(program,"u_matrix");

    var positionBuffer = gl.createBuffer();
    var barycentricBuffer = gl.createBuffer();

    var vertex_positions = [];



    for(var i=0;i<triangles_array.length;++i)
    {
        vertex_positions.push(vertex_array[triangles_array[i]*3]*50);
        vertex_positions.push(vertex_array[triangles_array[i]*3+1]*50);
        vertex_positions.push((vertex_array[triangles_array[i]*3+2]+0)*50);

    }
     //<ELIMINAR> ESTO ES SOLO PARA ENCONTRAR LOS PUNTOS IDENEOS PARA LOS CARTELES
    /*var z_ammount = 1000;
	var max_z = 5;
	var highest_z = [];
	var highest_index = [];
	for(var i=0;i<z_ammount;++i){
		highest_z[i] = 0;
		highest_index[i] = 0;
	}
     for(var i=0;i<vertex_array.length/3;++i){
		var vertex_z = vertex_array[i*3+2];
        if(vertex_z < max_z){
			var j=0;
			for(;j<z_ammount && vertex_z<highest_z[j];++j){
			}
			if(j<z_ammount ){
				for(var k=z_ammount-1;k>j;--k){
					highest_z[k] = highest_z[k-1];
					highest_index[k] = highest_index[k-1];
				}
				highest_z[j] = vertex_z;
				highest_index[j] = i;
			}
		}
	 }
	 var random_index = [Math.floor(Math.random()*z_ammount),Math.floor(Math.random()*z_ammount),Math.floor(Math.random()*z_ammount),Math.floor(Math.random()*z_ammount)];
	 var final_index = [];
     for(var i=0;i<4;++i){
		 interface_points[i*3+0] = vertex_array[highest_index[random_index[i]]*3]*50;
		 interface_points[i*3+1] = vertex_array[highest_index[random_index[i]]*3+1]*50;
		 interface_points[i*3+2] = vertex_array[highest_index[random_index[i]]*3+2]*50;
		 final_index.push(highest_index[random_index[i]]);
	 }
    console.log(final_index);
    console.log(interface_text);*/
     //</ELIMINAR>

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertex_positions), gl.STATIC_DRAW);

    var extended_bar_coords = [];
    for(var i=0;i<triangles_array.length;++i){
        for(var j=0;j<baricentric_coords.length;++j){
            extended_bar_coords[i*baricentric_coords.length+j] = baricentric_coords[j];
        }
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, barycentricBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(extended_bar_coords), gl.STATIC_DRAW);

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.cullFace(gl.BACK);

    draw_scene = function(){
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);



        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        //Tell it to use my programm
        gl.useProgram(program);
        //Enable positionAttributeLocation "a_position"
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.enableVertexAttribArray(barycentricAttributeLocation);
        //Tell the attribute how to get data out of the PositioBuffer
        var size = 3;          // 3 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer

        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = triangles_array.length;

        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var zNear = 1;
        var zFar = 2000;
        var projection_matrix = m4.perspective(deg_to_rad(field_of_view), aspect, zNear, zFar);

        var pivot = [-100,50,-0];

        var worldmatrix = m4.translation(pivot[0],pivot[1],pivot[2]);
        worldmatrix = m4.zRotate(worldmatrix,angles[2]);
        worldmatrix = m4.translate(worldmatrix,-pivot[0],-pivot[1],-pivot[2]);
        worldmatrix = m4.translate(worldmatrix,trans[0],trans[1],trans[2]);

        var pos_point = [interface_points[ transition_index*3+0],interface_points[ transition_index*3+1],
      interface_points[ transition_index*3+2],1];

        transform_camera = vectorLerp(default_transform_camera,
         m4.multiply_vector(worldmatrix,pos_point),t);

      	// var cameraMatrix = m4.xRotation(0.93);
      	// cameraMatrix = m4.translate(cameraMatrix, transform_camera[0]+
        //   camera_offset[0],transform_camera[1] + camera_offset[1],
        //   transform_camera[2]+camera_offset[2]);
        var cameraMatrix = m4.translation( transform_camera[0]+
            camera_offset[0],transform_camera[1] + camera_offset[1],
            transform_camera[2]+camera_offset[2]);
        //cameraMatrix = m4.xRotate(cameraMatrix,0.93);

      	var cameraPosition = [
      	    cameraMatrix[12],
      	    cameraMatrix[13],
      	    cameraMatrix[14],
      	];

        var transformed_camera_target = vectorLerp(
            m4.multiply_vector(worldmatrix,default_camera_target),
         m4.multiply_vector(worldmatrix,pos_point),t);


      	cameraMatrix =  m4.lookAt( cameraPosition,transformed_camera_target,camera_y_axis);

        var viewMatrix = m4.inverse(cameraMatrix);

        var matrix = m4.multiply(projection_matrix, viewMatrix); //viewProjectionMatrix

        matrix = m4.multiply(matrix,worldmatrix);


        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

        gl.uniform2f(resolutionUniformLocation,gl.canvas.width,gl.canvas.height);
        gl.uniform4f(colorUniformLocation,0.5,0.8,0.2,1);
        gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);

        gl.bindBuffer(gl.ARRAY_BUFFER, barycentricBuffer);
        gl.vertexAttribPointer(barycentricAttributeLocation, size, type, normalize, stride, offset);

        gl.drawArrays(primitiveType, offset, count);

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

        for(var i=0;i<z_index.length;++i){
            clip_coords[i*2+0] = tmp_coords[z_index[i]*2+0];
            clip_coords[i*2+1] = tmp_coords[z_index[i]*2+1];

        }
        draw_interface(clip_coords,z_index);
    }

    divided_text = new dic();
    for(var i = 0; i<interface_description.length;++i){
        var tmp = [];
        tmp = divide_text(interface_description[i]);
        divided_text.add_key(i);
        divided_text.insert_arr(i,tmp);
    }
    draw_scene();
    setInterval(Update,20);
}
var loadJson = function(){
      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/Json");
      xobj.open("GET","Json/temp_brain.json",true);
      xobj.send();
    xobj.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {
        set_geometry(xobj.responseText);
        main();
      }
    }
}
var set_geometry= function(json){

    var obj = JSON.parse(json);
    vertex_array = obj["vertices"];
    triangles_array = obj["faces"];
}
loadJson();
