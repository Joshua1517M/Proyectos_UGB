Vue.component('materias',{
    data:()=>{
        return{
            buscar: '',
            materias : [],
            materia: {
                codigoalumno: '',
                carrera: '',
                nombre1: '',
                nombre2: '',
                nombre3: '',
                nombre4: '',
                nombre5: '',
                mostrar_msg: false,
                msg: ''
            }
        }
    },
    methods:{

    },
    created(){

    },
    template:`
    <div class="appSistema" id="appSistema">

        <div class="card-header bg-primary">
            Materias
            <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#cardMateria" aria-label="Close"></button>
        </div>
        <div class="container-fluid w-75 bg-warning mt-4 ">
            <div id="cardMateria">
                <div class="row">
                    <div class=" col bg d-none d-lg-block container-fluid">

                    </div>
                    <div class="col rounded">
                        <div class="txt-lg-end">
                            <h2 class="fw-bold text-center py-3 text-black">Administracion de materias</h2>
                        </div>
                        <!--campos-->
                        <form method="post" @submit.prevent="guardarMateria" @reset="nuevaMateria">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="codAlumnoMateria" class="from-label text-black">verificar Alumno</label>
                                    <input type="text" class="form-control" id="codAlumnoMateria" v-model="materia.codigoalumno"
                                    pattern="[A-Za-zñÑáéíóúü]{4}[0-9]{6}"  placeholder="Codigo Alumno" required text = "text">
                                </div>
                                <div class="col-md-6">
                                    <br>
                                    <button id="btnVerificarAlumno" @click = "verificarAlumno(materia)" type="button" class="btn btn-success" title="verificar alumno"> Verificar </button>
                                </div>
                                <div class="row g-2">
                                    <div class="col col-md-5 text-center" >
                                        <div v-if="materia.mostrar_msg" 
                                        class="alert alert-primary alert-dismissible fade show" role="alert">
                                        {{materia.msg}}
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="cantMaterias" class="form-label text-black">Cantidad materias</label>
                                    <input required type="number" placeholder="5" class="form-control" id="cantMaterias" v-model="materia.codigomateria" max="5">
                                </div>
                                <div class="col-md-6">
                                    <br>
                                    <button id="btnactivar" type="button" class="btn btn-success" title="activar"> activar </button>
                                </div>
                                <br>
                                <div class="col-md-6">
                                    <label for="nombreMateria" class="form-label text-black">Nombre Materia 1</label>
                                    <select id="materia1" class="form-select" v-model="materia.nombre1" placeholder="Buscar Aqui"
                                    aria-label="Default select example">
                                    <option value="1">Programacion I</option>
                                    <option value="2">Base de datos</option>
                                    <option value="3">Electronica</option>
                                    <option value="4">Ingles basico</option>
                                    <option value="5">ing de software</option>
                                </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="nombreMateria2" class="form-label text-black">Nombre Materia 2</label>
                                    <select id="materia2" class="form-select" v-model="materia.nombre2" placeholder="Buscar Aqui"
                                    aria-label="Default select example">
                                    <option value="1">Programacion I</option>
                                    <option value="2">Base de datos</option>
                                    <option value="3">Electronica</option>
                                    <option value="4">Ingles basico</option>
                                    <option value="5">ing de software</option>
                                </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="nombreMateria3" class="form-label text-black">Nombre Materia 3</label>
                                    <select id="materia3" class="form-select" v-model="materia.nombre3" placeholder="Buscar Aqui"
                                        aria-label="Default select example">
                                        <option value="1">Programacion I</option>
                                        <option value="2">Base de datos</option>
                                        <option value="3">Electronica</option>
                                        <option value="4">Ingles basico</option>
                                        <option value="5">ing de software</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="nombreMateria4" class="form-label text-black">Nombre Materia 4</label>
                                    <select id="materia4" class="form-select" v-model="materia.nombre4" placeholder="Buscar Aqui"
                                        aria-label="Default select example">
                                        <option value="1">Programacion I</option>
                                        <option value="2">Base de datos</option>
                                        <option value="3">Electronica</option>
                                        <option value="4">Ingles basico</option>
                                        <option value="5">ing de software</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label for="nombreMateria5" class="form-label text-black">Nombre Materia 5</label>
                                    <select id="materia5" class="form-select" v-model="materia.nombre5" placeholder="Buscar Aqui"
                                        aria-label="Default select example">
                                        <option value="1">Programacion I</option>
                                        <option value="2">Base de datos</option>
                                        <option value="3">Electronica</option>
                                        <option value="4">Ingles basico</option>
                                        <option value="5">ing de software</option>
                                    </select>
                                </div>

                                <!--Botones-->
                                <div class="row g-2">
                                    <div class="col col-md-5 text-center" >
                                        <div v-if="materia.mostrar_msg" 
                                        class="alert alert-primary alert-dismissible fade show" role="alert">
                                        {{materia.msg}}
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
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
           
            
        </div>
         <!--tabla-->
         <div class="card text-white bg-white w-100" id="carBuscarAlumno">
            <div class="card-header bg-danger ">
                Busqueda de Alumnos

                <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarAlumno"
                    aria-label="Close"></button>
            </div>
            <div class="card-body ">
                <table class="table table-dark table-hover rounded">
                    <thead>
                        <tr>
                            <th colspan="7">
                                <input @keyup="buscandoAlumno" v-model="buscar" placeholder="Buscar Aqui"
                                    class="form-control" type="text">
                            </th>
                        </tr>
                        <tr>
                            <th>COD. ALUMNO</th>
                            <th>NOMBRE</th>
                            <th>APELLIDO</th>
                            <th>CODIGO</th>
                            <th>CARRERA CURSADA</th>
                            <th>MATERIA1</th>
                            <th>MATERIA2</th>
                            <th>MATERIA3</th>
                            <th>MATERIA4</th>
                            <th>MATERIA5</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="alumno in alumnos" @click="modificarAlumno(alumno)" :key="alumno.idAlumno">
                            <td>{{materia.codigoalumno}}</td>
                            <td>{{alumno.nombres}}</td>
                            <td>{{alumno.apellidos}}</td>
                            <td>{{alumno.codigo}}</td>
                            <td>{{alumno.carrera}}</td>
                            <td>{{materia.nombre1}}</td>
                            <td>{{materia.nombre2}}</td>
                            <td>{{materia.nombre3}}</td>
                            <td>{{materia.nombre4}}</td>
                            <td>{{materia.nombre5}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    </div>
    `

});