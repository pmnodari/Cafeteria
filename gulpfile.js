
/* function tarea(done) {
    console.log('Mi primer tarea...');

    done();
}

exports.tarea=tarea; */

//Importamos dependencias
const {src, dest, watch, series, parallel}=require('gulp');
const sass=require('gulp-sass')(require('sass'));
const postcss=require('gulp-postcss');
const autoprofixer=require('autoprefixer');
//Compilar SASS
function css(done) {
    /*  
    Pasos:
        1-Identificar archivo
        2-Compilar 
        3-Guardar el css 
    */
    src('src/scss/app.scss')
        //.pipe(sass({outputStyle:'compressed'}))
        .pipe(sass())
        .pipe(postcss([autoprofixer()]))
        .pipe(dest('build/css'));
    
    done();
}
//Creamos el Watch
function dev() {
    //watch('src/scss/app.scss',css);
    watch('src/scss/**/*.scss', css);
    
}
exports.css=css;
exports.dev=dev;
exports.default=series(css, dev);

//series-Se inicia una tarea, y hasta que finaliza, se inicia la siguiente.

//parellel-Todas inician juntas, y se van finalizando segun el caso.