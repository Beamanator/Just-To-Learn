/**
 * Name: Smart Assigning
 * Difficulty: Medium (10 min)
 * Time: 16:25
 */
function smartAssigning(names, statuses, projects, tasks) {
    let minTasks = tasks[0], minProjects = projects[0], mostAvailable = names[0];
    
    for (let i = 1; i < names.length; i++) {
        let myTasks = tasks[i], myProjects = projects[i], isAvailable = !statuses[i], myName = names[i];
        
        // skip if person isn't available
        if (!isAvailable) continue;
        
        // check if myTasks is less than maxTasks
        if (myTasks < minTasks) {
            minTasks = myTasks;
            minProjects = myProjects;
            mostAvailable = myName;
            continue;
        }
        
        // check of projects are less, if tasks are the same
        if (myTasks === minTasks && myProjects < minProjects) {
            minProjects = myProjects;
            mostAvailable = myName;
            continue;
        }
        
        // else, not useful
    }
    
    return mostAvailable;
}
