import NewProject from "./Components/NewProject.jsx";
import NoProjectSelected from "./Components/NoProjectSelected.jsx";
import SideBar from "./Components/sideBar.jsx";
import { useState } from "react";
import SelectedProject from "./Components/selectedProject.jsx";
function App() {
  const [projectstate, setProjectstate] = useState({
    selectedProjectId: undefined, //undefined means there is nothing
    projects: [],
    tasks: [],
  });
  const addTaskHandler = (text) => {
    
    setProjectstate((prevstate)=>{
      const NewTask = {
        text:text,
        projectId:prevstate.selectedProjectId,
        id: Math.random(),
      };
      return {
        ...prevstate,
        tasks:[...prevstate.tasks,NewTask]
      }
    })
  };
  const deleteTaskHandler = (receievedid) => {
    setProjectstate((prevstate) => {
      return {
        ...prevstate,
        tasks: prevstate.tasks.filter(
          (task) => task.id !== receievedid
        ),
      };
    });
  };
  const projectDeleteHandler = () => {
    setProjectstate((prevstate) => {
      return {
        ...prevstate,
        selectedProjectId: undefined,
        projects: prevstate.projects.filter(
          (project) => project.id !== prevstate.selectedProjectId
        ),
      };
    });
  };
  const projectselectHandler = (id) => {
    setProjectstate((prevstate) => {
      return {
        ...prevstate,
        selectedProjectId: id,
      };
    });
  };
  const cancelHandler = () => {
    setProjectstate((prevstate) => {
      return {
        ...prevstate,
        selectedProjectId: undefined,
      };
    });
  };
  const changehandler = () => {
    setProjectstate((prevstate) => {
      return {
        ...prevstate,
        selectedProjectId: null, //null means adding a new project
      };
    });
  };
  const newprojectaddHandler = (projectdata) => {
    const newProject = {
      ...projectdata,
      id: Math.random(),
    };
    setProjectstate((prevstate) => {
      return {
        ...prevstate,
        selectedProjectId: undefined,
        projects: [...prevstate.projects, newProject],
      };
    });
    // console.log(projectstate);
  };
  const selectedprojectdetails = projectstate.projects.find(
    (project) => project.id === projectstate.selectedProjectId
  );
  let content = (
    <SelectedProject
      onDelete={projectDeleteHandler}
      project={selectedprojectdetails}
      onAddTask={addTaskHandler}
      onDeleteTask={deleteTaskHandler}
      tasks={projectstate.tasks}
    />
  );
  if (projectstate.selectedProjectId === null) {
    content = (
      <NewProject onCancel={cancelHandler} onAdd={newprojectaddHandler} />
    );
  } else if (projectstate.selectedProjectId === undefined) {
    content = <NoProjectSelected onChange={changehandler} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        selectedProjectId={projectstate.selectedProjectId}
        onSelect={projectselectHandler}
        onChange={changehandler}
        projects={projectstate.projects}
      />
      {content}
    </main>
  );
}

export default App;
