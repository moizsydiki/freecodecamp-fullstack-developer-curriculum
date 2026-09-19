const poll = new Map();

const addOption = (option) => {
  if (option === "") {
    return "Option cannot be empty.";
  }

  if (!poll.has(option)) {
    poll.set(option, new Set());
    return `Option "${option}" added to the poll.`;
  }

  return `Option "${option}" already exists.`;
};

const vote = (option, voterId) => {
  if (!poll.has(option)) {
    return `Option "${option}" does not exist.`;
  }

  if (poll.get(option).has(voterId)) {
    return `Voter ${voterId} has already voted for "${option}".`;
  }

  poll.get(option).add(voterId);

  return `Voter ${voterId} voted for "${option}".`;
};

const displayResults = () => {
  let results = "Poll Results:\n";

  const sortedPoll = [...poll].sort((a, b) => {
    return b[1].size - a[1].size;
  });

  for (const [option, voters] of sortedPoll) {
    results += `${option}: ${voters.size} votes\n`;
  }

  return results.trimEnd();
};

addOption("JavaScript");
addOption("Python");
addOption("GO");
console.log(vote("GO", "Moiz"));
vote("Python", "Ahmad");
vote("Python", "Bilal");

console.log(displayResults());
