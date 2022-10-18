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
    const [nome, setNome] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [contato, setContato] = useState('')
    const [msg, setMsg] = useState('')
    const [valida, setValida] = useState(true)
    const dados = {
        id,
        nome,
        responsavel,
        contato    
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
        api.get(`/empresas/${id}`)
        .then(res => {
            if(res.status==200){
                let resultado=res.data.empresas;
                // setDados(res.data.usuario);
                // console.log("status "+res.status);
                // console.log(res.data.usuario); 
                setNome(resultado[0].nome);
                setResponsavel(resultado[0].responsavel);
                setContato(resultado[0].contato);
                // setConfSenha(resultado[0].senha);
        }else{
            console.log("houve um erro na requisição")
        }
           
        })
        .catch(function (error){
            console.log(error);
        });
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
            if (nome.length <= 3) {
                setMsg("Campo nome precisa ter mais de 3 letras")
                index++
            } else if (responsavel === "") {
                setMsg("Campo responsavel está vazio")
                index++
            }
            else if (contato === "") {
                setMsg("Campo contato está vazio")
                index++
            }
            if (index === 0) {
                api.patch("empresas",
                dados,
                {headers:{'Content-Type':'application/json'}}    
            ).then(function (response){
                alert("Cadastro salvo com sucesso!!!");
                window.location.href="/listaempresa"
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
                <Head title="Editar empresa" />
                {/* <p>Lista de usúarios</p> */}
                <section className="form">
                    <form onSubmit={salvardados} className="form-cadastro">
                        {/* <h1>Cadastrar-se</h1> */}
                        <p>{id}</p>
                        <label className="label">Nome</label>

                        <input placeholder="Nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                        <label className="label">Responsavel</label>
                        <input placeholder="Responsavel"
                            type="text"
                            value={responsavel}
                            onChange={e => setResponsavel(e.target.value)}
                        />
                        <label className="label">Contato</label>
                        <input placeholder="Contato" type="text"
                            value={contato}
                            onChange={e => setContato(e.target.value)}
                        />
                        {/* <label className="label">Confirmar senha</label>
                        <input placeholder="Confirmar senha" type="password"
                            onKeyUp={validasenha}
                            value={Confsenha}
                            onChange={e => setConfSenha(e.target.value)}
                        /> */}
                        <p>{msg}</p>
                        <button className="button_save" type="submit">
                            Salvar
                        </button>
                        {/* <a href="#">Cadastra nova Empresa</a> */}
                    </form>

                </section>
            </div>
        </div>
    )
}