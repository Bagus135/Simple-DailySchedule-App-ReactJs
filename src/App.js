import { useEffect,useState } from 'react';
import './App.css';
import logoapp from "./img/schedule.png"
import plus from "./img/plus.png"
import { DragDropContext, Draggable} from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable} from './droppableDnD.js';
import admin from "./img/user.png"
import foto from "./img/Ayanokouji.jpg"
import facebook from "./img/facebook.png"
import ig from "./img/instagram.png"
import github from "./img/github.png"


function Header({SearchText, setSearchText}){
  const [stateSearch, setStateSearch] = useState(false);
  const [SearchInput, setSearchInput] = useState('nonActiveInput');
  const [stateAdmin, setStateAdmin] = useState(false);
  const [AdminPage, setAdminPage] = useState('nonActivePage');
  function HandleClickSearchButton(){
    setStateSearch(!stateSearch)
    if(stateSearch){
      setSearchInput('ActiveInput');
    } else{
      setSearchInput('nonActiveInput');
      setSearchText('');
    };
  };
  function handleClickAdminButton(){
    setStateAdmin(!stateAdmin);
    if (stateAdmin){
      setAdminPage('ActivePage')
    } else {
      setAdminPage('nonActivePage')
    }
  };
  return(
<>
  <div className='Header'>
    <div className='Logo'>
      <img  src={logoapp}/>
      <h1>DailyList</h1>
    </div>
    <div className='SearchBar'>
      <div className='SearchBar2'>
        <input type='search' placeholder='Search Your Schedule Name' id={SearchInput} value={SearchText} onChange={(e) => setSearchText(e.target.value)}/>
      </div>
      <button type='button' onClick={HandleClickSearchButton} title='Search'>🔍</button>
      <button type='button' className='Admin' onClick={handleClickAdminButton}><img title='Author' src={admin}/></button>
    </div>
  </div>
  <Admin className={AdminPage} handleClickAdminButton={handleClickAdminButton}/>
</>
)
}
function Admin({className, handleClickAdminButton}){
  return (
    <div className={className}>
      <div className='blankpage' onClick={handleClickAdminButton}>
      </div>
      <div className='AdminWrapper'>
        <h2>ABOUT AUTHOR</h2>
        <img src={foto}/>
        <h3>Bagus Mustaqim</h3>
        <p>Ampun puhh.... Masih pemula puhh. Saya masih kroco puh. Saya belum ada apa apanya dibandingkan sepuh sekalian</p>
        <h3 className='follow'>Follow Me</h3>
        <div className='Sosmed'>
          <a href='https://www.facebook.com/bagus.mustaqim.56?mibextid=ZbWKwL' target='blank'><img src={facebook} title='Facebook'/></a>
          <a href='https://www.instagram.com/bagustaqim_?igsh=ZWxwajlsbHl2dGlx'target='blank'><img src={ig} title='Instagram'/></a>
          <a href='https://github.com/Bagus135' target='blank'><img src={github} title="Github"/></a>
        </div> 
      </div>
    </div>
  )
}

function AddSchedule({HandleAddButton}){
return(
  <div className='AddSchedule'>
    <button onClick={HandleAddButton}>
    <img src={plus}/>
    <h2>Add Schedule</h2>
    </button>
  </div>
)
}
function StartPage({text,Emote}){
  return(
    <div className='StartPage'>
      <p className='Mata'>{Emote}</p>
      <p className='text'>{text} </p>
    </div>
  )
}
function FormInput({setForm, FormName, HandleFormsubmit, CancelAddButton}){
  function handleCloseForm(){
    setForm(null)
  }
  return(
  <div className='FormWrapper'>
    <div className='blankpage' onClick={handleCloseForm}>
    </div>
    <form onSubmit={HandleFormsubmit}>
      <div className='NamaForm'>
        <h1>{FormName}</h1>
      </div>
      <div className='NamaKegiatan'>
      <p>Activity Name</p>
      <input type='text' placeholder='What is you want to do?' id='Nama'/>
      </div>
      <div className='Waktu'>
      <p>Time Schedule</p>
        <div className='WaktuKegiatan'>
          <input type='time' id='WaktuMulai'/>
          <p>---Until---</p>
          <input type='time' id='WaktuSelesai'/>
        </div>
      </div>
      <div className='Catatan'>
      <p>Description</p>
      <input type='text' placeholder='Input your  activity description here' id='Catatan'/>
      </div>
      <div className='AddButtonSchedule'>
        <button type='reset' className='Reset' onClick={CancelAddButton} >
        Cancel</button>
        <button className='Submit' type='submit'>Add</button>
      </div>
    </form>
  </div>
  )
}

function App(){
  const SavedData = JSON.parse(localStorage.getItem("Data"))

  const [Data, setData] = useState(()=>{
    return (SavedData || [])
  });
  
  const [Form, setForm] = useState(null);
  const [SearchText, setSearchText] = useState('');

  const [DataMap, setDataMap] = useState(()=>{
   if(Data.length !== 0){
    return <div className='Jadwalmu'>YOUR SCHEDULE</div>;
   }
  return <StartPage text="You haven't added your schedule yet :(" Emote='👀'/>})

  useEffect(()=>{
    localStorage.setItem("Data", JSON.stringify(Data))
  }, [Data]);
  

function HandleAddButton(){
  const Form = <FormInput FormName={'DATA INPUT'} HandleFormsubmit={HandleAddFormSubmit} CancelAddButton={CancelAddButton} setForm={setForm}/>;
  setForm(Form);
  function HandleAddFormSubmit(e){
    e.preventDefault();
    const DataForm = {
        Nama : e.target.Nama.value,
        WaktuMulai : e.target.WaktuMulai.value,
        WaktuSelesai : e.target.WaktuSelesai.value,
        Catatan : e.target.Catatan.value,
      }
    const nextData = [...Data, DataForm] 
    setData(nextData);
    setForm(null);
    setDataMap(<div className='Jadwalmu'>YOUR SCHEDULE</div>)
    e.target.reset()
    };
  };

  function CancelAddButton(){
    setForm(null);
  }
 
  function HandleEditForm(index){
    const Form = <FormInput FormName={'DATA EDIT'} HandleFormsubmit={HandleEditFormSubmit} CancelAddButton={CancelAddButton}  setForm={setForm}/>;
    setForm(Form);
    function HandleEditFormSubmit(e){
      e.preventDefault();
       const DataForm = {
        Nama : e.target.Nama.value,
        WaktuMulai : e.target.WaktuMulai.value,
        WaktuSelesai : e.target.WaktuSelesai.value,
        Catatan : e.target.Catatan.value,
      }
      Data.splice(index,1, DataForm);
      const nextData = Data.slice();
      setData(nextData);
      setForm(null)
    }
  };

  function DeleteContentBox(index){
    const DeleteData = Data.splice(index, 1);
    const Data2 = Data.slice();
    setData(Data2);
    if (Data2.length===0){
      setDataMap(<StartPage text="You haven't added your schedule yet :(" Emote='👀' />);
    } else{
      setDataMap(<div className='Jadwalmu'>YOUR SCHEDULE</div>);
    };
  };
  
  function handleDragEnd(hasil){
    if(!hasil.destination){
      return
    };
    const DataCopy = Array.from(Data);
    const draggedItem = DataCopy.splice(hasil.source.index, 1);
    DataCopy.splice(hasil.destination.index, 0 , ...draggedItem);
    setData(DataCopy);
  }

  return(
    <>
    <Header SearchText={SearchText} setSearchText={setSearchText}/>
    <AddSchedule HandleAddButton={HandleAddButton}/>
    {Form}
    {DataMap}
    <ContentBody Data={Data} HandleEditForm={HandleEditForm} DeleteContentBox={DeleteContentBox} handleDragEnd={handleDragEnd} SearchText={SearchText} setDataMap={setDataMap}/>
    </>
  )
}

function ContentBody({Data, HandleEditForm, DeleteContentBox, handleDragEnd, SearchText, setDataMap}){
  const DataNonSearch = [];
return (
<>
  <DragDropContext onDragEnd={handleDragEnd}>
    <Droppable droppableId='ContentBox1'>
      {(provided)=>(
        <div className='ContentBox1' ref={provided.innerRef} {...provided.droppableProps}>
          {Data.map((satuData, index) =>{
            if(satuData.Nama.toLowerCase().indexOf(SearchText.toLowerCase())=== -1){  
              DataNonSearch.push(index);
              if(DataNonSearch.length === 2*Data.length){
                return <StartPage text="We couldn't find your schedule :(" Emote='😢' key={DataNonSearch.length}/>};
              return 
             };
           return(
            <Draggable key={index} draggableId={index.toString(2)} index={index}>
              {(provided, snapshot) =>{
                const style ={
                  ...provided.draggableProps.style, backgroundColor: snapshot.isDragging? 'aqua' : 'rgba(135, 206, 250, 1)', border: snapshot.isDragging? 'black 2px solid' : null 
                };
                return(
                <div className='ContentBox2' key={index} ref={provided.innerRef}{...provided.dragHandleProps}{...provided.draggableProps} style={style} >
                  <div className='Nama'>{satuData.Nama}</div>
                  <div className='Waktu'>{satuData.WaktuMulai} - {satuData.WaktuSelesai}</div>
                  <div className='Catatan'>{satuData.Catatan}</div>
                  <div className='TombolEdit'>
                    <button  className='Edit' title='Edit' onClick={()=>HandleEditForm(index)}>✏</button>
                    <button key={index} title='Delete' onClick={()=> DeleteContentBox(index)} className='Hapus'>🗑</button>
                  </div>
                </div>
              )}}
            </Draggable>)
        })}   
        {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
</>
) 
}

export default App;