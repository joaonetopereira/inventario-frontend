import React, { useEffect, useState } from "react";
import "../../global.css";
import './style.css';
import Logo from '../../assets/images/1254276.png';
import { useHistory } from "react-router-dom";

import Usuario from '../../server/usuario.json';
import api from "../../server/api";


export default function Logom() {
    const history = useHistory();
    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [msg, setMsg] = useState('')
    const dados = [
        {
            email: email,
            nome: nome,
            id: id
        }
    ]
    function logar(e) {
        e.preventDefault()
        api.post("/usuario/logar")
        api.post(`/usuario/logar`, { email: email, senha: senha })
            .then(res => {
                if (res.status == 200) {
                    let resultado = res.data.usuario;
                    if (resultado.length > 0) {
                        let session = {
                            nome:resultado.nome,
                            email:resultado.email,
                            id:resultado.id
                        }
                        sessionStorage.setItem("session",session)
                        window.location.href = "/dashboard"
                    } else {
                        sessionStorage.clear(),
                        alert("Digite Email ou Senha validos")
                    }

                } else {
                    console.log("houve um erro na requisição")
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    // let usu;
    // if(email==="" || senha ===""){
    //     alert("campos vazios, verifique!")
    // }else{
    //     usu=Usuario.filter(function(value){
    //         return value.email===email && value.senha===senha
    //     })
    //     if(usu.length>0){
    //         setNome(usu[0].nomeusuario)
    //         setId(usu[0].id)
    //         //console.log(dados);
    //          localStorage.setItem("utilizador",JSON.stringify(usu));
    //         const value=localStorage.getItem("utilizador");
    //         const json=JSON.parse(value);
    //         console.log(json);
    //         // alert("Olá")
    //         // history.push('/dashboard');
    //         window.location.href=('/dashboard')
    //     }else{
    //         alert("Dados invalidos");
    //     }
    //-----------------------------------------------------------------------------------------
    // console.log(usu);
    // Usuario.map(usu=>{
    //     if(usu.email===email && usu.senha===senha){                  
    //         history.push('/dashboard');
    //     }else{
    //         setMsg("Dados não conferem!");
    //     }
    // })

    //     }
    // }
    // useEffect(()=>{
    //     // alert("chamou")
    //     Usuario.map(usu=>{
    //         console.log(usu.nomeusuario);
    //     })
    // },[])
    return (
        <div className="logom-container">
            <section className="form">
                <form onSubmit={logar}>
                    <h1>Faça seu login</h1>
                    <input placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="senha" type="password"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <button className="button_logim" type="submit">
                        Entrar
                    </button>
                    <a href="#">Cadastra nova Empresa</a>
                </form>

            </section>
            <section>
                <img src={Logo} alt="logo" width={150} />
                <h1>Sistema de Inveterio</h1>
            </section>
        </div>
    )
}