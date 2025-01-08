function get_progressbar(percentage, name) {
  // Get progress percentage from JSON

  // create the container
  const container = document.createElement('div');
  container.className = 'container-score';
  
  // Create the progress bar dynamically
  const progressBar = document.createElement('div');
  progressBar.className = 'progress-circle';
  progressBar.style.setProperty('--percent', percentage);
  
  // Create the progress bar dynamically
  const block = document.createElement('div');
  block.className = 'block-circle ';
  
  
  const score = document.createElement('div');
  score.className = 'text score';
  score.textContent = `${percentage}%`;
  
  const atk = document.createElement('div');
  atk.className = 'text name';
  atk.textContent = `${name}`;

  container.appendChild(progressBar);
  container.appendChild(block);
  container.appendChild(score);
  container.appendChild(atk);
  
  return container;
  }

  // Function to load JSON and update the progress bar

async function loadProgress(data, row_gap, num_columns, width_circle) {
  console.log(data)
  num_atks = Object.keys(data).length;
  
  console.log(num_atks, row_gap, num_columns);

  // I want to display at most 5 attaks for rows
  var num_atks = Object.keys(data).length;
  var num_rows = Math.ceil(num_atks / num_columns);
  console.log(num_atks, num_rows, num_columns);
  if(num_atks<num_columns){
    num_columns=num_atks
  }
  console.log(num_columns)
  const div = document.createElement('div');
  div.className = 'container-phase';
  console.log(num_columns*(width_circle + row_gap))
  div.style.setProperty('grid-template-columns', `repeat(${num_columns}, 1fr)`);
  div.style.setProperty('grid-template-rows', `repeat(${num_rows}, 1fr)`);
  div.style.setProperty('align-items', 'center');
  //div.style.setProperty('row-gap', `${row_gap}px`);
  div.style.setProperty('height', `${num_columns*(width_circle+row_gap)}px`);
  
  
  //iterate over all the element in the data
  for(const [key, value] of Object.entries(data)){
    let progress_bar = get_progressbar(percentage = value['misclassification'], name = key)
    div.appendChild(progress_bar)
  }
  document.getElementById('phase1').appendChild(div);
   
  }





//loadProgress(threat = "white");
// Select the root element
const root = document.documentElement;

// Get the computed style of the root element
const styles = getComputedStyle(root);

// Access the value of a CSS variable
const row_gap = styles.getPropertyValue('--row-gap').trim();
const width_circle = styles.getPropertyValue('--width-circle').trim();
const num_columns = styles.getPropertyValue('--num-columns').trim();
console.log(row_gap, width_circle, num_columns)

data = fetch('./data.json')
  .then(response => response.json())
  .then(response => loadProgress(response, row_gap, num_columns, width_circle));