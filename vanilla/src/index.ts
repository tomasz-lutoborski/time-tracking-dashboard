import { capitalizeFirstLetter } from './utils/index';
import { TimeFrame, TimeFrames, TimeTracker, TrackerNodes, UserTrackers, TrackersData } from './types/index';

const loggedUser = "John Newman";
const timeSpan = document.querySelector('.user-dashboard__time-span');
const editButtons = document.querySelectorAll('.tracker__title-more');
const editCloseButton = document.querySelector('.edit-tracker__close');
const editTrackerBoard = document.querySelector('.edit-tracker');
const container = document.querySelector('.container');

editCloseButton.addEventListener('click', (e) => {
  editTrackerBoard.classList.toggle('visible');
  container.classList.toggle('bg');
});

editButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    editTrackerBoard.classList.toggle('visible');
    container.classList.toggle('bg');
    editAction(e.target);
  })
});


// react on time span change
timeSpan.addEventListener('click', (event) => {
  let target = event as unknown as HTMLElement;
  for (let option of timeSpan.children[0].children as HTMLCollectionOf<HTMLElement>) {
    option.dataset.selected = "false";
  }
  if (target.classList.contains('user-dashboard__list-option')) {
    let isSelected = target.dataset.selected;
    target.dataset.selected = isSelected === 'true' ? 'false' : 'true';
  }
});

// edit tracker time on click of edit button
const editAction = (node: EventTarget) => {
  if (node instanceof HTMLElement) {
    if (editTrackerBoard.classList.contains('visible')) {
      const trackerTitle = node.parentNode.children[0] as HTMLElement;
      console.log(node.parentNode.children)
      const title = `${trackerTitle.innerText.toLowerCase()}`;
      editTrackerBoard.children[0].children[0].childNodes[0].textContent = title;
    }
  }
}

// populate html with data
const populateBoard = (data: UserTrackers[]) => {
  const trackers = document.querySelectorAll('[class^="tracker__info"]') as NodeListOf<HTMLElement>;
  const trackersNodes = {} as TrackerNodes;
  const trackersData = {} as TrackersData;

  const timeSpanOptions = document.querySelector('.user-dashboard__list');
  let timeSpan = '';

  // Populate trackers object with trackers nodes
  for (const tracker of trackers) {
    const trackerName = tracker.className.split('--')[1];
    trackersNodes[trackerName] = tracker;
  }

  // Get trackers data for current user
  for (let entry of data) {
    if (entry.name === loggedUser) {
      for (let trackerData of entry.timetrackers) {
        trackersData[trackerData.title.toLowerCase().split(' ')[0]] = trackerData.timeframes;
      }
    }
  }

  // Get selected time span
  for (let option of timeSpanOptions.children as HTMLCollectionOf<HTMLElement>) {
    if (option.dataset.selected === 'true') {
      timeSpan = option.innerText.toLowerCase();
    }
  }

  // Populate trackers nodes with data
  for (let node of Object.entries(trackersNodes)) {
    for (let child of node[1].children as HTMLCollectionOf<HTMLElement>) {
      if (child.className === 'tracker__last-time') {
        child.innerText = `Last ${timeSpan.slice(0, -2) == "dai" ? "day" : timeSpan.slice(0, -2)} - ${trackersData[node[0]][timeSpan]['previous']}`;
      }
      else if (child.className === 'tracker__time') {
        child.innerText = `${trackersData[node[0]][timeSpan]['current']}hrs`;
      }
      else {
        const element = child.children[0] as HTMLElement;
        element.innerText = `${capitalizeFirstLetter(node[0])}`;
      }
    }
  }
}

fetch('http://localhost:3000')
  .then(res => res.json())
  .then(data => populateBoard(data));