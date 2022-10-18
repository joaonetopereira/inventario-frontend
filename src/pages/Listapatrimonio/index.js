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
    },[dados])
    function Editar(i){
        window.location.href=`editarpatrimonio/${i}`
    }
    function mostrarlista(){
        // let cadastros = JSON.parse(localStorage.getItem("cd-patrimonio")||"[]")
        // setDados(cadastros)
        api.get('/patrimonio')
        .then(res => {
            if(res.status==200){
                setDados(res.data.patrimonio);
                console.log("status "+res.status);
                console.log(res.data.patrimonio); 
        }else{
            console.log("houve um erro na requisição")
        }
           
        });
        
    }
    function excluir(i,nome){
        confirmAlert ( { 
            title : 'Excluir patrimônio' , 
            message : `Deseja realmente excluir a empresa ${nome}` , 
            buttons : [ 
              { 
                label : 'Sim' , 
                onClick : ( )  => {
                    // let dadosnovos = []
                    // dadosnovos=dados.filter(item => item.id!==i)
                    // setDados(dadosnovos)
                    // localStorage.setItem('cd-patrimonio',JSON.stringify(dadosnovos))
                    api.delete(`/patrimonio/${i}`)
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
                <Head title="Lista de patrimônio"/>
                <div className="button_new">
                    <a href="/cadastrodepatrimonio">
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
                        <th></th>
                        <th></th>
                    </tr>
                        {
                        dados.map(usu=>{
                        return(
                            <tr key={usu.codpat}>
                                <td>{usu.codpat}</td>
                                <td>{usu.nome}</td>
                                <td><FiEdit color="blue" size={18} cursor="pointer" onClick={(e)=>Editar(usu.codpat)}/></td>
                                <td><FiDelete color="red" size={18} onClick={(e)=>excluir(usu.codpat,usu.nome)}
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
                    <th></th>
                    <th></th>
                </tr>
                </table>
                }
            </div>
        </div>
    )
}