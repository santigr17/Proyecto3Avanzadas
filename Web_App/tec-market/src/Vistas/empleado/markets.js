import React,{Component} from 'react';

// MBDREACT COMPONENTS
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBCard, MDBCardBody, MDBCardHeader, MDBInput, MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";

// MATERIAL ICONS
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import SearchIcon from '@material-ui/icons/Search';



import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

// HTTP
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


  const fields = [
    {
    'label' : 'Seleccionar' 
    },
    {
        'label' : 'Código',
        'field' : 'Codigo',
        'sort'  : 'asc'
    },
    {
        'label' : 'Nombre',
        'field' : 'Nombre',
        'sort'  : 'asc'
    },
    {
        'label' : 'Descripcion',
        'field' : 'Descripcion',
        'sort'  : 'asc'
    },
    {
        'label' : 'Teléfono',
        'field' : 'telefono',
        'sort'  : 'asc'
    },
    {
        'label' : 'rating',
        'field' : 'rating',
        'sort'  : 'asc'
    },
    {
        'label' : 'horario',
        'field' : 'horario',
        'sort'  : 'asc'
    },
    {
        'label' : 'Página Web',
        'field' : 'url',
        'sort'  : 'asc'
    }
];




class TablePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            check : false,
            save : false,
            confirm : false, 
            data : [],
            data_temp : [],
            data_panel : [],
            options : [],
            suggest : false,
        };
        this.delete_aeropuerto = this.delete_aeropuerto.bind(this);
        this.post_aeropuerto = this.post_aeropuerto.bind(this);
    }


    componentDidMount(){
        axios.get('http://localhost:8080/aeropuertos/')
        .then(response => {
          var rows = []
          if(response.data.length>0){
            response.data.forEach(line => {
              var temp = {}  
              fields.forEach(element => {
                  console.log("COMPONENT DIDMOUTN",element)
                  if(element.label !== 'Seleccionar'){
                        if(element.field == "telefono"||element.field == "email")
                            temp[element.field] = line.Contacto[element.field]
                        else
                        temp[element.field] = line[element.field]
                    }
                } );    
              console.log("print", temp)  
              rows.push(temp)
            });
          }
          else
            rows = []
          var empty_data = rows.length>0 ? false : true; 
          this.set_values(rows);
          this.setState( { data:rows, empty:empty_data } );
          
        })
        .catch(error => {
          console.log(error);
          alert('Error tratando de obtener Aeropuertos')
    
        });
      
      }

    post_aeropuerto(aeropuerto){
        var json = {}
        var contacto = {}
        fields.forEach(element => {
            if(element.field == 'email' || element.field == 'telefono')
              contacto[element.field] = aeropuerto[element.field]
            else
                json[element.field] = aeropuerto[element.field]
        });
        
        json['Contacto'] = contacto;
        
        axios.post('http://localhost:8080/aeropuerto/', json)
        .then(response => {
            var line = response["data"];
            var temp = {}  
              fields.forEach(element => {
                if(element.field == "telefono"||element.field == "email")
                  temp[element.field] = line.Contacto[element.field]
                else
                  temp[element.field] = line[element.field]
              })
            this.state.data.push(temp)
            this.set_values(this.state.data)
            // this.setState()
            alert("Aeropuerto agregado correctamente")
            
          })
          .catch( error =>{
            alert(error)
          }
        )
      }
     


      delete_aeropuerto(borrados){
        borrados.forEach(element => {
          var route = 'http://localhost:8080/aeropuerto/'+ element.Codigo;
          var url = new URL(route)
            axios.delete(url)
            .then(response => {
                // if(response.message === "Aeropuerto eliminado correctamente"){
                    this.state.data.splice(element.index, 1)
                    this.state.data_panel.splice(element.index, 1)
                    this.setState({data_temp:this.state.data})
                    alert("UPDATE!!!")

                // }
            } )
            .catch(error=>{
              console.log("print",error)
              alert(error)
            })
          } );
      }
      



    /**
     * DATA HANDLERS IN THE TABLE
     */
    set_values(data){
        alert("SET VALUES CALL")
        console.log(data)
        var panel = []
        data.forEach(row => {
            let panel_row = {};
            row.check = false;
            let id = data.indexOf(row)
            fields.forEach(element => {
                if(element.label !== 'Seleccionar')
                    panel_row[element.field] = row[element.field]
                else
                    panel_row['checkbox'] = <MDBInput size="sm" label=" " type="checkbox"  onClick={b=>this.check_row(b)} id={id} />;
            });
            panel.push(panel_row);
        });
        this.setState( { data_panel:panel, } )
        console.log(this.state.data_panel)
    }
    
    check_row(b){
        console.log("CHECK",this.state.data)
        var key = b.target.id
        console.log("CHECK",key)
        this.state.data[key].check = !this.state.data[key].check
    }

    get_value(value,field){
        let i = this.state.data_temp.length - 1
        this.state.data_temp[i][field] = value
    }
    
    editvalue(row, colum, val){
        
    }

    save_value(){
        var i = this.state.data_temp.length - 1
        let newRow = this.state.data_temp[i]
        if(newRow !== {} && newRow.hasOwnProperty(fields[1]["field"]) ){
            this.state.data_panel.pop()
            this.state.data_temp.pop()
            this.post_aeropuerto(newRow)
            this.setState({save:!this.state.save})
        }
        else{
            let labelKey = fields[1]['label']
            alert("Favor Ingresar dato en el Campo: "+labelKey)
        }
    }
    

    cancel_save(){
        this.state.data_panel.pop();
        this.setState({
            save : !this.state.save
        });
    }
    
    
    create_elements(){
        if(!this.state.save && !this.state.edit) {
            var newElement = {};
            var confirm  = <div>
                         <CheckCircleIcon onClick = {() => this.save_value()}/> 
                         <CancelIcon onClick = {() => this.cancel_save()}/>
                </div>
            newElement["confirm"]= confirm;
            fields.forEach(col => {
                if(col.label !== "Seleccionar")
                    newElement[col.field]=(<MDBInput size="sm" type="textbox" hint={col.label} getValue={b=>this.get_value(b,col.field)} />)
            });
            
            this.state.data_panel.push(newElement)
            this.state.data_temp.push({})
            
            this.setState ({save : !this.state.save});
        }
    }

    edit_elements(){
        if(!this.state.save){
            var check = false
            
            if(!this.state.edit){
                for (let index = 0; index < this.state.data.length; index++) {
                    var row = this.state.data[index];
                    if (row.check){
                        check = true
                        for(let key in this.state.data_panel[index]){
                            if(key != 'checkbox' && key !== '__proto__' ){
                                let text = this.state.data[index][key]
                                this.state.data_panel[index][key] = <MDBInput size="sm" type="textbox" hint={text}/>
                            }
                        }
                    }
                }
            }
            if(check)
                this.setState({ edit:!this.state.edit });
            else
                alert("Seleccione los datos que desea editar")
        }
    else
        alert("Finalice la acción anterior para realizar una nueva")
    }

    
    delete_elements(){
        if(this.state.edit || this.state.save)
            alert("Finalice la acción anterior para realizar una nueva")
        else{
            var check = false
            for (let index = 0; index < this.state.data.length; index++) {
                var row = this.state.data[index];
                if (row.check)
                    check = true
            }            
            if(check)
                this.setState({ confirm:true});
            else
                alert("Seleccione los datos que desea editar")
        }
    }

    handleClose(){
        this.setState({confirm : false})
      };

    confirmDelete() {
        var elements = [];
        for (let index = 0; index < this.state.data.length; index++) {
            var row = this.state.data[index];
            if (row.check)
                elements.push({
                    Codigo:row.Codigo,
                    index:index
                })
        }
        this.delete_aeropuerto(elements)
        this.setState({confirm:false})
    }

    //  NUEVAS FUNCIONES
    suggestOption(value){
        if(value){
            let newOptions = [
                'Walmart',
                'Megasuper',
                'Pali'
            ]
            this.setState ( {
                suggest : true,
                options : newOptions,
            } )
        }
        else {
            this.setState ( {
                suggest : false,
            } )
        }
    }
    
    selectOption(index){
        alert(index)
        console.log("print",index)
    }


    render(){
        const formStyle = {
            display:"flex",
            justifyContent:"flex-start"
        }
    return(
        <MDBCard narrow>
         <Dialog
            open={this.state.confirm}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle id="alert-dialog-slide-title">{"¿Seguro que desea eleminar los elementos seleccionados?"}</DialogTitle>
        <DialogActions>
          <Button onClick={() => this.handleClose()} color="primary">
            CANCELAR
          </Button>
          <Button onClick={() => this.confirmDelete()} color="primary">
            ACEPTAR
          </Button>
        </DialogActions>
      </Dialog>

        <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
            <h3 href="#" className="white-text mx-3">Supermercados</h3>
            
        </MDBCardHeader>
        <MDBCardBody narrow>
        <MDBContainer>
        <h5>Agregar un Supermercado</h5>
             <div style = {formStyle}>
                <div style={{marginRight:"25px"}}>
                <MDBInput size="sm" label="Latitud" type="text"   id='pala' />       
                </div>
                <MDBInput size="sm" label="Longitud" type="text"   id='melon' />       
                <div style={{display:"flex", alignItems:"center" }}>
                    <MDBBtn size="sm" onClick = {() => this.delete_elements()}  color="white">
                        <SearchIcon style= {{color:'black'}}/>
                    </MDBBtn>
                </div>
                </div>
            </MDBContainer>
            <MDBContainer>
            <MDBInput size="sm" label="Dirección" type="text" getValue={b=>this.suggestOption(b)}  id='dir' />
            {
                this.state.suggest &&
                
                  <MDBListGroup style={{ width: "22rem" }}>
                    {
                        this.state.options.map((option) => <MDBListGroupItem onClick={op =>{this.selectOption(option)}} hover>{option}</MDBListGroupItem>)
                    }
                  </MDBListGroup>
            }

            
                <MDBInput size="sm" label="Codigo Supermercado" type="text"   id={'code'} />
                </MDBContainer>

    
        </MDBCardBody>
        <hr/>
        <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-around align-items-center py-2 mx-4 mb-3">
            <h5 style = {{color:"white"}}>
                Supermercados Registrados
            </h5>
            <div>
            {
                this.state.edit &&
                <MDBBtn outline  size="sm" color="green" className="px-2" onClick = {()=>this.get_values()}>
                    <CheckCircleIcon/>
                </MDBBtn>
            }
            {
                (this.state.edit )&& 
                <MDBBtn outline  size="sm" color="red" className="px-2">
                    <CancelIcon/>
                </MDBBtn>
            }
            <MDBBtn outline size="sm" onClick = {()=>this.edit_elements()} color="white" className="px-2">
                <EditIcon/>
            </MDBBtn>
            {/* <MDBBtn outline onClick = {() => this.create_elements()} size="sm" color="white" className="px-2">
                <AddCircleOutlineIcon/>
            </MDBBtn> */}
            <MDBBtn outline  onClick = {() => this.delete_elements()}size="sm" color="white" className="px-2">
                <DeleteIcon/>
            </MDBBtn>
            </div>
        </MDBCardHeader>
        <MDBCardBody cascade>
            
            <MDBTable btn fixed>
            <MDBTableHead columns={fields} />
            <MDBTableBody rows={this.state.data_panel} />
            </MDBTable>
            
        </MDBCardBody>
        </MDBCard>
    );}
};


export default TablePage;