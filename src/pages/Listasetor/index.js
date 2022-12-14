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
        window.location.href=`/editarsetor/${i}`
    }
    function mostrarlista(){
        // let cadastros = JSON.parse(localStorage.getItem("cd-setor")||"[]")
        // setDados(cadastros)
        api.get('/setor')
        .then(res => {
            if(res.status==200){
                setDados(res.data.setor);
                console.log("status "+res.status);
                console.log(res.data.setor); 
        }else{
            console.log("houve um erro na requisição")
        }
           
        });
    }
    function excluir(i,nome){
        confirmAlert ( { 
            title : 'Excluir setor' , 
            message : `Deseja realmente excluir o setor de ${nome}` , 
            buttons : [ 
              { 
                label : 'Sim' , 
                onClick : ( )  => {
                    // let dadosnovos = []
                    // dadosnovos=dados.filter(item => item.id!==i)
                    // setDados(dadosnovos)
                    // localStorage.setItem('cd-setor',JSON.stringify(dadosnovos))
                    api.delete(`/setor/${i}`)
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
                <Head title="Lista de setores"/>
                <div className="button_new">
                    <a href="/cadastrodesetor">
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
                            <tr key={usu.codset}>
                                <td>{usu.codset}</td>
                                <td>{usu.nome}</td>   
                                <td><FiEdit color="blue" size={18} cursor="pointer" onClick={(e)=>Editar(usu.codset)}/></td>
                                <td><FiDelete color="red" size={18} onClick={(e)=>excluir(usu.codset,usu.nome)}
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