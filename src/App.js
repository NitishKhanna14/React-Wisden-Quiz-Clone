import React from "react";
import Table from "./table"
import Tablehead from "./tablehead"
import "./index.css"
import axios from "axios"

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      pname: "",
      rjname:"",
      arr:[],
      points: 0
    }
    this.change=this.change.bind(this)
    this.takeText=this.takeText.bind(this)
    this.func=this.func.bind(this)
  }

  async func(e) {
    await this.change(e)
    this.takeText()
  }

  async componentDidMount() {
    const playersData = (await axios.get("http://localhost:5000/players/")).data.map((pl)=>pl)
    this.setState({
      arr:playersData
    })
  }


 change(e) {
    const {name,value} = e.target
    this.setState ({
      [name]:value
    })
    //axios.get("http://localhost:5000/players/").then((res)=> {console.log(res)})
  }

  takeText() {
    const rname=this.state.pname
    const res = this.state.arr.find(st => st.name.toUpperCase().includes(rname.toUpperCase()))
    console.log(res)
    if (res) {
    const resu=res.name
    let arr=resu.split(" ")
    arr = arr.map((st)=>st.toUpperCase())
    if (res && arr.includes(rname.toUpperCase())) {
      this.setState((prevState)=> ({
        rjname:resu,
        arr : prevState.arr.map((st) => {
          if (st.name.toUpperCase()===resu.toUpperCase()) {
            st.cond=true
            return st 
          }
          else {
            return st
          }
        })
      }))

      this.setState((prevState) => {
        return {
        points:prevState.points+1
      }
    })     
    }
  }
}

  render () {

    return (
      <div>
        <p className="title"> Cricket Quiz </p>
        <input className="inp" type="text" name="pname" value={this.state.pname} 
        onChange={this.func} />
        <span className="score">Score: {this.state.points}/{this.state.arr.length} </span>       
        <Tablehead/>
        <Table xyz={this.state.arr}/>
      </div>
    )
  }
}

export default App