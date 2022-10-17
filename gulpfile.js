
/* function tarea(done) {
    console.log('Mi primer tarea...');

    done();
}

exports.tarea=tarea; */

//Importamos gulp y gulp-sass
const {src, dest}=require('gulp');
const sass=require('gulp-sass')(require('sass'));

//Compilar SASS
function css(done) {
    /*  
    Pasos:
        1-Identificar archivo
        2-Compilar 
        3-Guardar el css 
    */
    src('src/scss/app.scss')
        .pipe(sass())
        .pipe(dest('build/css'));
    
    done();
}
exports.css=css;