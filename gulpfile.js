'use strict';


const gulp = require('gulp'),
    webpack = require('webpack-stream'),
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    postCSS = require('gulp-postcss');


//const dist = 'C:/OpenServer/OSPanel/domains/cui-admin';
const dist = 'C:/OpenServer/domains/cui-admin';
const prod = './build';
gulp.task('copy-html', () => {
    return gulp.src('./app/src/index.html')
        .pipe(gulp.dest(dist))
        .on("end", browserSync.reload);
});

gulp.task('build-js', () => {
    return gulp.src('./app/src/index.js')
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'script.js'
            },
            watch: false,

            devtool: 'source-map',
            module: {
                rules: [
                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                            // Creates `style` nodes from JS strings
                            "style-loader",
                            // Translates CSS into CommonJS
                            "css-loader",
                            // Compiles Sass to CSS
                            "sass-loader",
                        ],
                    },
                    {
                        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: '[name].[ext]',
                                    outputPath: 'settings/fontsLibrary/'
                                }
                            }
                        ]
                    },
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader']
                    },
                    {
                        test: /\.(jpe?g|png|gif|svg)$/i,
                        use: [
                            'url-loader?limit=100000',
                            {
                                loader: 'file-loader',
                                options: {
                                    name: '[name].[ext]',
                                    outputPath: 'images/'
                                }
                            }

                        ]
                    },
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }],
                                    "@babel/react",
                                    {
                                        'plugins': ['@babel/plugin-proposal-class-properties']}]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest(dist));
        //.on("end", browserSync.reload);
});
gulp.task("build-sass", () => {
    return gulp.src("./app/settings/index.scss")
        .pipe(sass())
        .pipe(gulp.dest(dist));
        //.on("end", browserSync.reload);
});
//gulp.task('browser-sync', function() {
    //browserSync.init({
        //proxy: dist
    //});
//});
gulp.task("copy-api", () => {
    gulp.src("./app/api/**/.*")
        .pipe(gulp.dest(dist + "/api"));
    return gulp.src("./app/api/**/*.*")
        .pipe(gulp.dest(dist + "/api"));
        //.on("end", browserSync.reload);
});



gulp.task("watch", () => {

    gulp.watch("./app/src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./app/api/**/*.*", gulp.parallel("copy-api"));
    gulp.watch("./app/settings/index.scss", gulp.parallel("build-sass"));
    gulp.watch("./app/src/**/*.js", gulp.parallel("build-js"));
    //browserSync.init({
        //server: "./dev/",
        //port: 4000,
        //notify: true
    //});



});

gulp.task("build", gulp.parallel("copy-html","copy-api", "build-sass", "build-js"));

gulp.task("prod", () => {
    gulp.src('./app/src/index.html')
        .pipe(gulp.dest(prod));

    gulp.src("./app/api/**/.*")
        .pipe(gulp.dest(prod + "/api"));
    gulp.src("./app/api/**/*.*")
        .pipe(gulp.dest(prod + "/api"));
    gulp.src("./app/assets/**/*.*")
        .pipe(gulp.dest(prod + "/assets"));


    gulp.src('./app/src/index.js')
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'script.js'
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    debug: false,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }],
                                    "@babel/react"]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest(prod));
   return gulp.src("./app/scss/style.scss")
        .pipe(sass())
        .pipe(postCSS([autoprefixer()]))
        .pipe(cleanCSS())
        .pipe(gulp.dest(prod));

});

gulp.task("default", gulp.parallel("watch", "build"));