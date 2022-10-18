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
    // const [email, setEmail] = useState('')
    // const [senha, setSenha] = useState('')
    // const [Confsenha, setConfSenha] = useState('')
    const [msg, setMsg] = useState('')
    const [valida, setValida] = useState(true)
    const dados = {
        id,
        nome    
    }
    useEffect(()=>{
        mostrardados();
    },[])
    function mostrardados(){
        // let listaUser = JSON.parse(localStorage.getItem("cd-setor"))
        //  listaUser.
        //     filter(value => value.id == id).
        //     map(value => {
        //         setNome(value.nome)
        //         // setEmail(value.email)
        //         // setSenha(value.senha)
        //         // setConfSenha(value.senha)
        //     })
        api.get(`/setor/${id}`)
        .then(res => {
            if(res.status==200){
                let resultado=res.data.setor;
                // setDados(res.data.usuario);
                // console.log("status "+res.status);
                // console.log(res.data.usuario); 
                setNome(resultado[0].nome);
                // setEmail(resultado[0].email);
                // setSenha(resultado[0].senha);
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
        //validasenha()
        
            let index = 0
            if (nome.length <= 1) {
                setMsg("Campo nome precisa ter mais de 3 letras")
                index++
            } else 
            if (index === 0) {
                // let listaUser = JSON.parse(localStorage.getItem("cd-setor"))
                // listaUser.map((item)=>{
                //     if(item.id==id){
                //         item.nome=nome;
                //     }
                // })
                // localStorage.setItem("cd-setor",JSON.stringify(listaUser))
                // window.location.href="/listasetor";
                // alert("Dados salvos com sucesso");
                api.patch("setor",
                    dados,
                    {headers:{'Content-Type':'application/json'}}    
                ).then(function (response){
                    alert("Cadastro salvo com sucesso!!!");
                    window.location.href="/listasetor"
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
                <Head title="Editar setor" />
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