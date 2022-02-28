Vue.component('registro', {
    data:()=>{
        return{
            buscar: '',
            alumnos: [],
            alumno: {
                accion: 'nuevo',
                mostrar_msg: false,
                msg: '',
                idAlumno: '',
                nombres: '',
                apellidos: '',
                fecha:'',
                sexo:'',
                codigo: '',
                telefono: '',
                direccion: '',
                correo: '',
                carrera:'No Cursando',
                mat1:'',
                mat2:'',
                mat3:'',
                mat4:'',
                mat5:''
            }
        }
    },
    methods:{
        buscandoAlumno() {
            this.obtenerAlumnos(this.buscar);
            /*
            //console.log(this.buscar);
            this.alumnos.filter(alumno => {
                if(alumno.nombres.toLowerCase().indexOf(this.buscar.toLowerCase()) > -1){
                    return alumno;
                }
            });
            */
        },
        eliminarAlumno(alumno) {
            if (confirm(`Estas a punto de ELIMINAR al alumno ${alumno.nombres}`)) {
                this.alumno.idAlumno = alumno.idAlumno;
                this.alumno.accion = 'eliminar';
                this.guardarAlumno();
            }
        },
        modificarAlumno(datos) {
            this.alumno = JSON.parse(JSON.stringify(datos));
            this.alumno.accion = 'modificar';
        },
        guardarAlumno() {
            let sql = '',
                parametros = [];
            if (this.alumno.accion == "nuevo") {
                sql = 'INSERT INTO alumnos (nombres, apellidos,fecha, sexo, codigo, telefono, direccion, correo, carrera) VALUES (?,?,?,?,?,?,?,?,?)';
                parametros = [this.alumno.nombres, this.alumno.apellidos, this.alumno.fecha, this.alumno.sexo, this.alumno.codigo,
                this.alumno.telefono, this.alumno.direccion, this.alumno.correo, this.alumno.carrera];
            } else if (this.alumno.accion == "modificar") {
                sql = 'UPDATE alumnos SET nombres=?, apellidos=?, fecha=?, sexo=?, codigo=?, telefono=?, direccion=?, correo=?, carrera=? WHERE idAlumno=?';
                parametros = [this.alumno.nombres, this.alumno.apellidos, this.alumno.fecha, this.alumno.sexo, this.alumno.codigo,
                this.alumno.telefono, this.alumno.direccion, this.alumno.correo, this.alumno.carrera, this.alumno.idAlumno];
            } else if (this.alumno.accion == "eliminar") {
                sql = 'DELETE FROM alumnos WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
            }
            db_sistema.transaction(tx => {
                tx.executeSql(sql,
                    parametros,
                    (tx, res) => {
                        this.nuevoAlumno();
                        this.obtenerAlumnos();
                        this.alumno.mostrar_msg = true;
                        this.alumno.msg = 'Alumno procesado con exito';
                    },
                    (tx, err) => {
                        this.alumno.mostrar_msg = true;
                        this.alumno.msg = `Error al guardar al Alumno: ${err.message}`;
                    });
            });
        },
        obtenerAlumnos(valor = '') {
            let respuesta = db_sistema.transaction(tx => {
                tx.executeSql(`SELECT * FROM alumnos WHERE nombres like "%${valor}%" OR codigo like "%${valor}%" OR apellidos like"%${valor}%" ORDER BY apellidos`, [], (index, datos) => {
                    this.alumnos = [];
                    for (let i = 0; i < datos.rows.length; i++) {
                        this.alumnos.push(datos.rows[i]);
                    }
                });
            });
        },
        nuevoAlumno() {
            this.alumno.accion = 'nuevo';
            this.alumno.msg = '';
            this.alumno.nombres = '';
            this.alumno.apellidos = '';
            this.alumno.fecha = '';
            this.alumno.sexo = '';
            this.alumno.codigo = '';
            this.alumno.telefono = '';
            this.alumno.direccion = '';
            this.alumno.correo = '';
            this.alumno.carrera='No Cursa';
            this.alumno.mat1='';
            this.alumno.mat2='';
            this.alumno.mat3='';
            this.alumno.mat4='';
            this.alumno.mat5='';
        }
    },
    created() {
        db_sistema.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS alumnos(idAlumno INTEGER PRIMARY KEY AUTOINCREMENT, nombres char(100), apellidos char(100),fecha date, sexo char(30), codigo char(10), telefono TEXT, direccion TEXT, correo TEXT, carrera TEXT, mat1 TEXT,mat2 TEXT,mat3 TEXT,mat4 TEXT,mat5 TEXT)');
        }, err => {
            console.log(err);
        });
        this.obtenerAlumnos();
    },
    
    template:`<div class="appSistema" id="appSistema">
    <div class="card-header bg-primary">
                    Registro de alumnos
        <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carAlumno" aria-label="Close"></button>
    </div>

    <div class="container-fluid w-75 bg-warning mt-4 ">
        <div id="carAlumno">

            <div class="row">

                <div class=" col bg d-none d-lg-block container-fluid">
                
                </div>
                <div class="col rounded">
                    <div class="text-lg-end">
                        <img src="icono.png" width="58" alt="" class="m-1">
                        <h2 class="fw-bold text-center py-3 text-black">REGISTRATE</h2>
                    </div>

                    <!--Para el registro-->

                    <form method="post" @submit.prevent="guardarAlumno" @reset="nuevoAlumno">
                        <div class="row g-3">
                            
                            <div class="col-md-6">
                                <label for="nombres" class="form-label text-black">Nombres</label>
                                <input placeholder="Juan Perez" title="Ingrese sus nombres" v-model="alumno.nombres"
                                    pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control ">
                            </div>
                            <div class="col-md-6">
                                <label for="apellidos" class="form-label text-black">Apellidos</label>
                                <input placeholder="Campos Portillo" title="Ingrese sus apellidos"
                                    v-model="alumno.apellidos" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required
                                    type="text" class="form-control">
                            </div>
                            <div class="col-md-6">
                                <label for="fecha" class="form-label text-black">Fecha de Nacimiento</label>
                                <input v-model="alumno.fecha" required type="date" class="form-control">
                            </div>
                            <div class="col-md-6">
                                <label for="sexo" class="form-label text-black">Selecione</label>
                                <select form="sexo" v-model="alumno.sexo" required class="form-select" aria-label="Default select example">
                                    <option selected>Selecione su sexo</option>
                                    <option value="mujer">Mujer</option>
                                    <option value="hombre">Hombre</option>
                                    <option value="prefiero">Prefiero no decirlo</option>
                                  </select>
                            </div>
                            <div class="col-md-6">
                                <label for="codigo" class="form-label text-black">Codigo</label>
                                <input placeholder="USLA121220" title="Ingrese su codigo" v-model="alumno.codigo"
                                    pattern="[A-Za-zñÑáéíóúü]{4}[0-9]{6}" required type="text" class="form-control">
                            </div>
                            <div class="col-md-6">
                                <label for="telefono" class="form-label text-black">Telefono</label>
                                <input placeholder="1212-1212" title="Ingrese su Telefono" v-model="alumno.telefono"
                                    pattern="[0-9]{4}-[0-9]{4}" required type="text" class="form-control">
                            </div>
                            <div class="col-md-12">
                                <label for="direccion" class="form-label text-black">Direccion</label>
                                <input placeholder="San Salvador" title="Ingrese su direccion"
                                    v-model="alumno.direccion" pattern="[A-Za-zñÑáéíóúü ]{3,100}" required
                                    type="text" class="form-control">
                            </div>
                            <div class="col-md-12">
                                <label for="correo" class="form-label text-black">Correo Electronico</label>
                                <input placeholder="juan@gmail.com" title="Ingrese su correo"
                                    v-model="alumno.correo" required type="email" class="form-control">
                            </div>
                            <!--Para los botones-->
                            <div class="row">
                                <div class="col col-md-5 text-center">
                                    <div v-if="alumno.mostrar_msg"
                                        class="alert alert-primary alert-dismissible fade show" role="alert">
                                        {{ alumno.msg }}
                                        <button type="button" class="btn-close" data-bs-dismiss="alert"
                                            aria-label="Close"> <span aria-hidden="true">&times;</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-2">
                                <div class="col col-md-6 text-center">
                                    <input class="btn btn-success w-100" type="submit" value="Guardar">
                                </div>
                                <div class="col col-md-6 text-center">
                                    <input class="btn btn-primary w-100 " type="reset" value="Limpiar">
                                </div>
                            </div>
                            <p></p>

                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!--Para la busqueda del alumno-->
        <div class="card text-white bg-white w-100" id="carBuscarAlumno">
            <div class="card-header bg-danger ">
                Busqueda de Alumnos

                <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarAlumno"
                    aria-label="Close"></button>
            </div>
            <div class="card-body ">
                <table class="table table-dark table-hover w-100">
                    <thead>
                        <tr>
                            <th colspan="10">
                                Buscar: <input @keyup="buscandoAlumno" v-model="buscar" placeholder="Buscar Alumno"
                                    class="form-control w-100" type="text">
                            </th>
                        </tr>
                        <tr>
                            <th>NOMBRE</th>
                            <th>APELLIDO</th>
                            <th>FECHA</th>
                            <th>SEXO</th>
                            <th>CODIGO</th>
                            <th>TELEFONO</th>
                            <th>DIRECCION</th>
                            <th>CORREO</th>
                            <th>CARRERA</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="alumno in alumnos" @click="modificarAlumno(alumno)" :key="alumno.idAlumno">
                            <td>{{alumno.nombres}}</td>
                            <td>{{alumno.apellidos}}</td>
                            <td>{{alumno.fecha}}</td>
                            <td>{{alumno.sexo}}</td>
                            <td>{{alumno.codigo}}</td>
                            <td>{{alumno.telefono}}</td>
                            <td>{{alumno.direccion}}</td>
                            <td>{{alumno.correo}}</td>
                            <td>{{alumno.carrera}}</td>
                            <td>
                                <button class="btn btn-danger" @click="eliminarAlumno(alumno)">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>

`
});