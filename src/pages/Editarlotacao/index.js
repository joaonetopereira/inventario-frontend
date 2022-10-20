import React, { useEffect, useState } from "react";
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head";
import Usuarios from "../../server/usuario.json";
//import './styles.css';
import '../../global.css';
import { FiEdit, FiTrash, FiDelete, FiFilePlus } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useParams } from "react-router-dom";
import api from "../../server/api";

export default function EditarUsuario() {
    const {id}= useParams()
    const [idusuario, setIdusuario] = useState('')
    const [idpatrimonio, setIdpatrimonio] = useState('')
    const [idempresa, setIdempresa] = useState('')
    const [idsetor, setIdsetor] = useState('')
    // const [datamovimentacao, setDatamovimentacao] = useState('')

    const [usuario, setUsuario] = useState([])
    const [patrimonio, setPatrimonio] = useState([])
    const [setor, setSetor] = useState([])
    const [empresa, setEmpresa] = useState([])
    const [datalotacao, setDatalotacao] = useState([])
    const [msg, setMsg] = useState('')
    const [valida, setValida] = useState(true)
    const dados = {
        id,
        idusuario,
        idpatrimonio,
        idempresa,
        idsetor,
        datalotacao      
    }
    useEffect(()=>{
        mostrardados();
    },[])
    function mostrardados(){
        // let listaempresa = JSON.parse(localStorage.getItem("cd-empresas") || "[]")
        //  listaempresa.
        //     filter(value => value.id == id).
        //     map(value => {
        //         setNome(value.nome)
        //         setResponsavel(value.responsavel)
        //         setContato(value.contato)
                
        //     })
        api.get('/usuario')
        .then(res => {
            if(res.status==200){
                setUsuario(res.data.usuario);
                // console.log("status "+res.status);
                // console.log(res.data.usuario); 
        }else{
            console.log("houve um erro na requisição")
        }});
        api.get('/empresas')
        .then(res => {
            if(res.status==200){
                setEmpresa(res.data.empresas);
                // console.log("status "+res.status);
                // console.log(res.data.empresas); 
        }else{
            console.log("houve um erro na requisição")
        }});
        api.get('/patrimonio')
        .then(res => {
            if(res.status==200){
                setPatrimonio(res.data.patrimonio);
                // console.log("status "+res.status);
                // console.log(res.data.patrimonio); 
        }else{
            console.log("houve um erro na requisição")
        }});
        api.get('/setor')
        .then(res => {
            if(res.status==200){
                setSetor(res.data.setor);
                // console.log("status "+res.status);
                // console.log(res.data.setor); 
        }else{
            console.log("houve um erro na requisição")
        }});

        api.get(`/lotacao/editar/${id}`)
        .then(res => {
            if(res.status==200||res.status==304){
                let resultado=res.data.lotacao;
                setIdusuario(resultado[0].idUsuario);
                setIdempresa(resultado[0].idEmpresa);
                setIdpatrimonio(resultado[0].idpatrimonio);
                setIdsetor(resultado[0].idSetor);
                setDatalotacao(resultado[0].datalotacao);
                console.log(resultado);
                
        }else{
            console.log("houve um erro na requisição")
        }
           
        })
    //     .catch(function (error){
    //         console.log(error);
    //     });
    }
    // function validasenha() {
    //     if (senha !== "") {
    //         if (senha !== Confsenha) {
    //             setValida(false)
    //             setMsg("Senhas não conferem!")
    //         } else {
    //             setValida(true)
    //             setMsg("Senhas iguais!")
    //         }
    //     } else {
    //         setValida(false)
    //         setMsg("Campo senha está vazio")
    //     }
    // }
    function salvardados(e) {
        e.preventDefault();
        
            let index = 0
            // if (nome.length <= 3) {
            //     setMsg("Campo nome precisa ter mais de 3 letras")
            //     index++
            // } else if (responsavel === "") {
            //     setMsg("Campo responsavel está vazio")
            //     index++
            // }
            // else if (contato === "") {
            //     setMsg("Campo contato está vazio")
            //     index++
            // }
            if (index === 0) {
                console.log(dados)
                    api.patch("lotacao",
                            dados,
                            {headers:{'Content-Type':'application/json'}}    
                        ).then(function (response){
                            alert("Cadastro salvo com sucesso!!!");
                            window.location.href="/listalotacao"
                        });
                }
    }
    return (
        <div className="dashboard-container">
            {/* <p>
                Dashboard
            </p> */}
            <Menu />
            <div className="principal">
                <Head title="Editar lotação" />
                {/* <p>Lista de usúarios</p> */}
                <section className="form">
                    <form onSubmit={salvardados} className="form-cadastro">
                        {/* <h1>Cadastrar-se</h1> */}
                        <label className="label">Usuarios </label>
                        <select value={idusuario} onChange={e => setIdusuario(e.target.value)}>
                            <option></option>
                            {usuario.map(usu => {
                                return (
                                    <option value={usu.codusu}>{usu.nome}</option>
                                )
                            }
                            )
                            }
                        </select>
                        <label className="label">Patrimônio</label>
                        <select value={idpatrimonio} onChange={e => setIdpatrimonio(e.target.value)}>
                        <option></option>
                            {patrimonio.map(pat => {
                                return (
                                    <option value={pat.codpat}>{pat.nome}</option>
                                )
                            }
                            )
                            }
                        </select>
                        <label className="label">Setor </label>
                        <select value={idsetor} onChange={e => setIdsetor(e.target.value)}>
                        <option></option>
                            {setor.map(set => {
                                return (
                                    <option value={set.codset}>{set.nome}</option>
                                )
                            }
                            )
                            }
                        </select>

                        <label className="label">Empresa </label>
                        <select value={idempresa} onChange={e => setIdempresa(e.target.value)}>
                        <option></option>
                            {empresa.map(emp => {
                                return (
                                    <option value={emp.codemp}>{emp.nome}</option>
                                )
                            }
                            )
                            }
                        </select>
                        <label className="label">Data</label>
                        <input type={"date"} onChange={e=>setDatalotacao(e.target.value)}></input>
                        <p>{msg}</p>
                        <button className="button_save" type="submit">
                            Cadastrar-se
                        </button>
                    </form>

                </section>
            </div>
        </div>
    )
}