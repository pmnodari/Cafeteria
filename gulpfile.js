
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
//Manejo de las imagenes
function imagenes() {
    return src('src/img/**/*')
            .pipe(dest('build/img'));

    //El return reemplaza al done
    /* Lo unico que hacemos es llevar las imagenes a otra carpeta: build. No especificamos el formato porque hay multiples. */
}
//Creamos el Watch
function dev() {
    //watch('src/scss/app.scss',css);
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);//Antes modificaciones de imagenes
    
}
exports.css=css;
exports.dev=dev;
exports.imagenes=imagenes;
exports.default=series(imagenes, css, dev);

//series-Se inicia una tarea, y hasta que finaliza, se inicia la siguiente.

//parellel-Todas inician juntas, y se van finalizando segun el caso.