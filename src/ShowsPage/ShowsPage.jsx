import React,{Component} from 'react';
import {Button, Form, Header, Icon, Modal} from "semantic-ui-react";
import api from "../_services/api";
import {AddTool} from "../AddTool";
import {uuidv4} from "../_helpers/guid";
import {ShowsList} from "../ShowsList";
import {AddShow} from "../AddShow";
import {history} from "../_helpers";

export class ShowsPage extends Component{
    constructor(props) {
        super(props);
        this.setCurrentTab = this.setCurrentTab.bind(this);
        this.updateShowsList = this.updateShowsList.bind(this);
        this.state = {
            showsList:[],
            actionModal:false,
            deleteOpen:false,
            open:false,
            firstOpen:false,
            secondOpen:false,
            selectedUID:'',
            currentShow:[{uid:"", show_name:"",production:""}],
            showName:"",
            nameError:"",
            showProduction:"",
            productionError:"",
            viewShowTabActive:true,
            addShowTabActive:false,
            lookupTabActive:false,
            currentTab:["users"]

        }
    }

componentDidMount() {
        let uid = uuidv4();
        console.log("uid fuuuck")
        console.log(uid);
this.retrieveShows().then(v => console.log('waaat is v:',v));
}

    // network calls
async retrieveShows(){
        let auth = JSON.parse(localStorage.getItem('user'))
        let conf = {headers: {
                'Content-Type': 'application/json',
                'Authorization': `${auth}`
            }}
        await api.get('/shows',conf)
            .then(
                res => {
                    console.log("res.data in retrieveshows")
                    console.log(res.data)
                    this.setState({showsList:res.data.data});

                }
            )
    }
handleDelete(){
        console.log("handle delete")
    }
async updateShow(){
        console.log("inside update show")
        let auth = JSON.parse(localStorage.getItem('user'));
        let conf = { headers: {
                'Content-Type': 'application/json',
                'Authorization': `${auth}`
                /* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2MTUxMzA5MDMsInVzZXIiOiJ0ZXN0QHRlc3QuY29tIn0.ELZfjw4w_TDEo8SF0QxOBgx1FDkkAWNtZDhXloOssM8 */
            }}
        let show = {
            "uid":this.state.currentShow[0],
            "show_name":this.state.showName,
            "production":this.state.showProduction
        }
        //console.log("show contents: ",show)
        let response = undefined;
        response = await api.put(`/updateShow/${this.state.currentShow[0]}`,show,conf).then(
            res => {
                response  = res.data;
                console.log("res.data: ",res.data)
            }
        )
        if (response === "Token is expired"){
            localStorage.removeItem("user");
            history.push('/login');
        }

    }
async deleteShow(id){
        let auth = JSON.parse(localStorage.getItem('user'));
        let conf = { headers: {
                'Content-Type': 'application/json',
                'Authorization': `${auth}`
                /* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2MTUxMzA5MDMsInVzZXIiOiJ0ZXN0QHRlc3QuY29tIn0.ELZfjw4w_TDEo8SF0QxOBgx1FDkkAWNtZDhXloOssM8 */
            }}
        let show = {
            "uid":this.state.currentShow[0],
            "show_name":this.state.showName,
            "production":this.state.showProduction
        }
        //console.log("show contents: ",show)
        let response = undefined;
        console.log("DELETE API CALL !!!")
        console.log("currentshow: ",id)
        response = await api.delete(`/shows/${id}`,conf)
        .catch(function (error){
            console.log(error.toJSON());
        })
        .then(
            res => {
                response  = res.data;
                console.log("res.data: ",res.data)
            }
        )
        if (response === "Token is expired"){
            localStorage.removeItem("user");
            history.push('/login');
        }
    }
handleSubmit(){
        if(this.state.showName === "" || this.state.showProduction === ""){
            this.state.showName.length === 0 ? this.state.setState({nameError:"Must enter a new show name."}) : this.setState({nameError:""})
            this.state.showProduction.length === 0 ? this.setState({productionError:"Must enter a new production name."}) : this.setState({productionError:""})
            return
        }

        this.updateShow()
        this.setState({secondOpen:false})
        this.setState({showName:""})
        this.setState({showProduction:""})
        // I remake the show list and exclude the one i just updated
        let tempList = [];
        for (let i = 0; i < this.state.showsList.length; i++){
            if (this.state.showsList[i].uid !== this.state.currentShow[0]){
                tempList.push(this.state.showsList[i]);
            }
        }
        //then i add the updates to the list
        tempList.push(this.state.currentShow)
        console.log("templist: ",tempList);
        //showlist is the refresh condition of useEffect so when this state is changed the
        //table is re rendered on change
        this.setState({showList:tempList})
        this.setState({currentShow:[]})

    }
handleDeleteShow(id){
    this.deleteShow(id);
    this.setState({deleteOpen:false});

    }
setCurrentTab(tab){
        this.setState({currentTab:tab});
}
setDeleteOpen(){
        this.setState({deleteOpen:!this.state.deleteOpen});
}
setSelectedUID(uid){
        this.setState({selectedUID:uid});
}
setFirstOpen(bool){
        this.setState({firstOpen:bool})
}
setSecondOpen(bool){
        this.setState({secondOpen:bool})
}
setActionsModal = (bool) => {
        this.setState({actionModal:bool});
}
setCurrentShow = (show) => {
    console.log("set current show: ",show)
    console.log("set current show: ",show[0])
        this.setState({
            currentShow:[
                {
                    uid:show[0],
                    show_name:show[1],
                    production:show[2]
                }
            ]
        })
        console.log("this.state.currentshow after setcurrentshow: ",this.state.currentShow)
}
setOpen(bool){
        this.setState({open:bool})
}
updateShowsList(show){
        let tmpArray = this.state.showsList
        tmpArray.push(show);
        this.setState({showsList:tmpArray})
}
switchTabs(){
        switch(this.state.currentTab){
            case "add show":
                return <AddShow updateList={this.updateShowsList} switch={this.setCurrentTab}/>;
            case "view shows":
                return ( this.state.showsList.length !== 0 ? <ShowsList setDeleteOpen={this.setDeleteOpen} setCurrentShow={this.setCurrentShow} setSelectedUID={this.setSelectedUID} setActionsModal={this.setActionsModal} switch={this.setCurrentTab} showsList={this.state.showsList}/> : []);
            default:
                return null;


        }
    }


render(){
    const buttonStyle = {
        marginTop:'10px',
        backgroundColor:"black",
        color:'white'
    }
    const errorStyle = {
        color:"red"
    }
    return (
        <div>
            <div className="ui pointing menu">
                <p className={this.state.viewShowTabActive === true ? "active item" : "item"} onClick={() => {
                    console.log("setting current tab to view shows")
                    if(!this.state.viewShowTabActive){
                        this.setState({viewShowTab:true})
                        this.setState({lookupTabActive:false})
                        this.setState({addShowTab:false})
                    }
                    this.setCurrentTab("view shows")
                }
                }>View Shows</p>
                <p className={this.state.addShowTabActive === true ? "active item" : "item"} onClick={() => {
                    if(!this.state.addShowTabActive){
                        this.setState({addShowTabActive:true});
                        this.setState({lookupTabActive:false});
                        this.setState({viewShowTabActive:false})
                    }
                    this.setCurrentTab("add show")
                }
                }>Add Shows</p>
                <p className={this.state.lookupTabActive === true ? "active item" : "item"} onClick={() => {
                    if(!this.state.lookupTabActive){
                        this.setState({viewShowTabActive:false});
                        this.setState({lookupTabActive:true});
                        this.setState({addShowTabActive:false});
                    }
                    this.setCurrentTab("look-up")
                }
                }>Look-Up Show</p>

            </div>
            <div className="ui segment">
                {this.state.viewShowTabActive === true ? <ShowsList setDeleteOpen={this.setDeleteOpen}  setCurrentShow={this.setCurrentShow} setActionsModal={this.setActionsModal}  setSelectedUID={this.setSelectedUID} showsList={this.state.showsList.length != 0 ? this.state.showsList : []} /> : this.switchTabs()}
            </div>

            <Modal
                onClose={() => this.setFirstOpen(false)}
                onOpen={() => this.setFirstOpen(true)}
                open={this.state.actionModal}
            >
                <Modal
                    basic
                    onClose={() => this.setOpen(false)}
                    onOpen={() => this.setOpen(true)}
                    open={this.state.deleteOpen}
                    size='small'

                >
                    <Header icon>
                        <Icon name='trash' />
                        <h1>Delete Record {this.state.currentShow.length !== 0 ? this.state.currentShow[1] : null}</h1>
                    </Header>
                    <Modal.Content>
                        <p>
                            Are you sure? This Action is irreversible.
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic color='red' inverted onClick={
                            () => {
                                this.setState({deleteOpen:!this.state.deleteOpen})
                                this.setOpen(false)

                            }
                        }>
                            <Icon name='remove' /> No
                        </Button>
                        <Button color='green' inverted onClick={() => {
                            console.log("fired delete tdeleteTool(props.item.uid)");
                            this.handleDeleteShow(this.state.currentShow[0].uid)
                            this.setOpen(false)
                            this.setFirstOpen(false);
                            this.setCurrentShow
                        }
                        }>
                            <Icon name='checkmark' /> Yes
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Modal.Header>Edit Record?</Modal.Header>
                <Modal.Content image>
                    <div className='image'>
                        <Icon name='edit' />
                    </div>
                    <Modal.Description>
                        <p>You may edit existing, or delete record.</p><p><span style={{color:'red'}}><h3>*Warning* </h3></span></p><p> All Changes are final.</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => this.setActionsModal(false)} >
                        Cancel <Icon name='ban' />
                    </Button>
                    <Button onClick={() => this.setSecondOpen(true)} primary>
                        Edit Record  <Icon name='right chevron'/>
                    </Button>
                    <Button onClick={() => this.setDeleteOpen(true)} negative>
                        Delete Record  <Icon name='trash'/>
                    </Button>
                </Modal.Actions>

                <Modal
                    onClose={() => this.setSecondOpen(false)}
                    open={this.state.secondOpen}
                    size='small'
                >
                    <Modal.Header>Edit Record <h1>{this.state.currentShow.length !== 0 ? this.state.currentShow[1] : null} ?</h1></Modal.Header>
                    <Modal.Content>
                        <div className="ui form">
                            <h4 className="ui dividing header">Add Show to database:</h4>
                            <div className="fields">
                                <div className="field">
                                    <label>Show name</label>
                                    <input type="text" onChange={(e) => this.setState({showName:e.target.value})} placeholder="Show Name" value={this.state.showName}/>
                                    {this.state.nameError != ""? <span style={errorStyle}>{this.state.nameError}</span>:null}
                                </div>
                                <div className="field">
                                    <label>Production name</label>
                                    <input type="text" placeholder="Production Name" onChange={(e) => this.setState({showProduction:e.target.value})} value={this.state.showProduction}/>
                                    {this.state.productionError !== ""? <span style={errorStyle}>{this.state.productionError}</span>:null}
                                </div>

                            </div>
                            <div className="field">  <Button style={buttonStyle} onClick={this.handleSubmit}>Add Show</Button></div>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            icon='ban'
                            content='Cancel'
                            onClick={() => this.setSecondOpen(false)}
                        />
                        <Button
                            icon='check'
                            content='All Done'
                            onClick={() =>{
                                this.setSecondOpen(false)
                                this.setState({actionModal:false})
                                this.setCurrentShow([])
                            }}
                        />
                    </Modal.Actions>
                </Modal>
            </Modal>


        </div>

    )
}

}