Vue.component('matricula', {
    data:()=>{
        return {
            buscar: '',
            alumnos: [],
            alumno: {
                accion: 'nuevo',
                mostrar_msg: false,
                msg: '',
                idAlumno: '',
                nombres: '',
                apellidos: '',
                codigo: '',
                telefono: '',
                direccion: '',
                correo: '',
                carrera: ''
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
            if (confirm(`Estas a punto de ELIMINAR al alumno ${this.alumno.nombres}`)) {
                this.alumno.idAlumno = alumno.idAlumno;
                this.alumno.accion = 'eliminar';
                this.guardarAlumno();
            }
        },
        modificarAlumno(datos) {
            this.alumno = JSON.parse(JSON.stringify(datos));
            this.alumno.accion = 'modificar';
        },
        guardarAlumno(alumno) {
            nombrealumno = this.alumno.nombres;
            let sql = '',
                parametros = [];
            if (this.alumno.carrera == "1") {
                sql = 'UPDATE alumnos SET carrera="Ing. en Sistemas y Redes Informáticas" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.carrera
            } else if (this.alumno.carrera == "2") {
                sql = 'UPDATE alumnos SET carrera="Mercadotécnia" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.carrera
            } else if (this.alumno.carrera == "3") {
                sql = 'UPDATE alumnos SET carrera="Administración de Empresas" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.carrera
            } else {
                sql = 'UPDATE alumnos SET carrera="No Cursando" WHERE idAlumno=?';
                parametros = [this.alumno.idAlumno];
                numselec = this.alumno.carrera
            }
            db_sistema.transaction(tx => {
                tx.executeSql(sql,
                    parametros,
                    (tx, res) => {
                        this.nuevoAlumno();
                        this.obtenerAlumnos();
                        this.alumno.mostrar_msg = true;
                        if (numselec == "4") {
                            this.alumno.msg = `Se anuló la matricula del alumno ${nombrealumno}`;
                        } else {
                            this.alumno.msg = `El alumno ${nombrealumno} ha sido matriculado con exito.`;
                        }
                    },
                    (tx, err) => {
                        this.alumno.mostrar_msg = true;
                        this.alumno.msg = `Error al matricular al Alumno: ${err.message}`;
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
            this.alumno.codigo = '';
            this.alumno.telefono = '';
            this.alumno.direccion = '';
            this.alumno.correo = '';
            this.alumno.carrera = '';
        }
    },
    created(){
        this.obtenerAlumnos();
    },
    template:`
    <div class="appSistema" id="appSistema">
        <div class="card-header bg-primary">
            Matricula de alumnos
            <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carMatricula" aria-label="Close"></button>
        </div>

        <div class="container-fluid w-75 bg-warning mt-4 ">
            <form method="post" @submit.prevent="guardarAlumno">

                <div id="carMatricula">
                    <h2 class="fw-bold py-3 text-black">Matricular Alumno</h2>

                    <table class="table table-dark table-hover rounded">
                        <thead>
                            <tr>
                                <th colspan="7">
                                    <input @keyup="buscandoAlumno" v-model="buscar" placeholder="Buscar Aqui"
                                        class="form-control" type="text">
                                </th>
                            </tr>
                            <tr>
                                <th>NOMBRE</th>
                                <th>APELLIDO</th>
                                <th>CODIGO</th>
                                <th>CARRERA CURSADA</th>
                                <th>SELECCIONAR CARRERA</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="alumno in alumnos" @click="modificarAlumno(alumno)" :key="alumno.idAlumno">
                                <td>{{alumno.nombres}}</td>
                                <td>{{alumno.apellidos}}</td>
                                <td>{{alumno.codigo}}</td>
                                <td>{{alumno.carrera}}</td>
                                <td>
                                    <select class="form-select" v-model="alumno.carrera" placeholder="Buscar Aqui"
                                        aria-label="Default select example">
                                        <option value="1">Ing. en Sistemas y Redes Informaticas</option>
                                        <option value="2">Mercadotécnia</option>
                                        <option value="3">Administración de Empresas</option>
                                        <option value="4">No Cursando</option>
                                    </select>
                                </td>
                                <td>
                                    <button class="btn btn-primary" @click="guardarAlumno(alumno)">Guardar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="row"></div>
                    <div v-if="alumno.mostrar_msg" class="alert alert-primary alert-dismissible fade show" role="alert">
                        {{ alumno.msg }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    <div class="row"></div>
                </div>
            </form>
        </div>`
});