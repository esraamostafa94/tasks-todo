import axios from 'axios';

class DataBase {
  // get all tasks
  static fetchTasks() {
    return axios.get('http://localhost:3001/tasks');
  }

  // get all collections
  static fetchCollections() {
    return axios.get('http://localhost:3001/collections');
  }

  // insert new task in DB
  static AddNewTask(item, done, collectionId) {
    return axios.post(
      'http://localhost:3001/tasks',
      {
        title: item,
        completed: done,
        collection: collectionId,
      },
    );
  }
  // insert new collection in DB
  static AddNewCollection(collection) {
    return axios.post(
      'http://localhost:3001/collections',
      {
        name: collection,
      },
    );
  }

  // update completed
  static updatedone(id, done) {
    const url = `http://localhost:3001/tasks/${String(id)}`;
    axios.patch(
      url,
      {
        completed: done,
      },
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static deleteTask(id) {
    const url = `http://localhost:3001/tasks/${String(id)}`;
    axios.delete(url)
      .then((response) => {
        console.log('"delete"');
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static UpdateTask(id, taskTitle) {
    const url = `http://localhost:3001/tasks/${String(id)}`;
    axios.patch(
      url,
      {
        title: taskTitle,
      },
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default DataBase;
