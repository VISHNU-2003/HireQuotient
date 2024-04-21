export function fetchHoldingsData(cb) {
  fetch("https://canopy-frontend-task.now.sh/api/holdings")
    .then(res => res.json())
    .then(result => cb(result, null))
    .catch(error => cb(null, error));
}
