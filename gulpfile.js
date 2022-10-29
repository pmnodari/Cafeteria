
/* function tarea(done) {
    console.log('Mi primer tarea...');

    done();
}

exports.tarea=tarea; */

//Importamos dependencias

//CSS y SASS
const {src, dest, watch, series, parallel}=require('gulp');
const sass=require('gulp-sass')(require('sass'));
const postcss=require('gulp-postcss');
const autoprofixer=require('autoprefixer');

//IMAGENES
const imagemin=require('gulp-imagemin');
const webp=require('gulp-webp');
const avif=require('gulp-avif');

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
            .pipe(imagemin({optimizationLevel: 3}))
            .pipe(dest('build/img'));

    //El return reemplaza al done
    /* Lo unico que hacemos es llevar las imagenes a otra carpeta: build. No especificamos el formato porque hay multiples. */
    /* El orden en las tareas en gulp es de suma importancia.  */
}

//Convertir a Webp y Avif 
function versionWebp() {
    //opcional
    const opciones={
        quality:50
    }
    return src('src/img/**/*.jpg')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
}
function versionAvif() {
     //opcional
    const opciones={
        quality:50
    }
    return src('src/img/**/*.jpg')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));
}

//Creamos el Watch
function dev() {
    //watch('src/scss/app.scss',css);
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
    //Antes modificaciones o agregaciones de imagenes    
}
exports.css=css;
exports.dev=dev;
exports.imagenes=imagenes;
exports.versionWebp=versionWebp;
exports.versionAvif=versionAvif;
exports.default=series(imagenes, versionWebp, versionAvif, css, dev);


//El default se llama con gulp, sino se especifica la tarea.

//series-Se inicia una tarea, y hasta que finaliza, se inicia la siguiente.

//parellel-Todas inician juntas, y se van finalizando segun el caso.