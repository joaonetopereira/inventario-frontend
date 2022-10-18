import React, { useState, useEffect } from "react";
import Menu from "../../componentes/Menu";
import Head from "../../componentes/Head";
import Usuarios from "../../server/usuario.json";
import './styles.css';
import '../../global.css';
import { FiEdit, FiTrash, FiDelete, FiFilePlus } from "react-icons/fi";
import { confirmAlert } from 'react-confirm-alert';
import  'react-confirm-alert/src/react-confirm-alert.css' ;
import api from "../../server/api";

export default function Listausuarios(){
    const [dados,setDados] = useState([]);
    useEffect(()=>{
        mostrarlista();
    },[])
    function Editar(i){
        window.location.href=`/editarusuario/${i}`
    }
    function mostrarlista(){
        // let cadastros = JSON.parse(localStorage.getItem("cd-usuarios")||"[]")
        // setDados(cadastros)
        // fetch('http://localhost:5000/usuario')
        //     .then((response) => response.json())
        //     .then((data) => setDados(data.usuario))
        //     .then((data) => console.log(data));
        api.get('/usuario')
        .then(res => {
            if(res.status==200){
                setDados(res.data.usuario);
                console.log("status "+res.status);
                console.log(res.data.usuario); 
        }else{
            console.log("houve um erro na requisição")
        }
           
        });
        
           

    }
    function excluir(i,nome){
        confirmAlert ( { 
            title : 'Excluir usúario' , 
            message : `Deseja realmente excluir o cadastro de ${nome}` , 
            buttons : [ 
              { 
                label : 'Sim' , 
                onClick : ( )  => {
                    // let dadosnovos = []
                    // dadosnovos=dados.filter(item => item.id!==i)
                    // setDados(dadosnovos)
                    // localStorage.setItem('cd-usuarios',JSON.stringify(dadosnovos))
                    api.delete(`/usuario/${i}`)
                    .then(res=>{});
                    alert("dados deletados com sucesso");
                    mostrarlista();
                }
              } , 
              { 
                label : 'não' , 
                onClick :( )  =>  alert ( 'Click No' ) 
              } 
            ] 
          } ) ; 
    }
    return(
        <div className="dashboard-container">
            {/* <p>
                Dashboard
            </p> */}
            <Menu/>
            <div className="principal">
                <Head title="Lista de usúarios"/>
                <div className="button_new">
                    <a href="/cadastrodeusuario">
                        <FiFilePlus
                        size={24}
                        color="green"
                        cursor="pointer"
                        />
                    </a>
                </div>
                { dados.length>0 ?
                <table border={1} border-color="black">
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                    </tr>
                        {
                        dados.map(usu=>{
                        return(
                            <tr key={usu.codusu}>
                                <td>{usu.codusu}</td>
                                <td>{usu.nome}</td>
                                <td>{usu.email}</td>
                                <td><FiEdit color="blue" size={18} cursor="pointer" onClick={(e)=>Editar(usu.codusu)}/></td>
                                <td><FiDelete color="red" size={18} onClick={(e)=>excluir(usu.codusu,usu.nome)}
                                cursor="pointer" 
                                /></td>
                            </tr>
                            )
                        })
                        }
                </table>
                :
                <table border={1} border-color="black">
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th></th>
                    <th></th>
                </tr>
                </table>
                }
            </div>
        </div>
    )
}