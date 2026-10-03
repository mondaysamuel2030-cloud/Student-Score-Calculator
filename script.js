
const scoreInputs = document.querySelectorAll(".score");
const message = document.getElementById("message");


function getGrade(total) {
  if (total >= 70) {
    return "A";
  } else if (total >= 60) {
    return "B";
  } else if (total >= 50) {
    return "C";
  } else if (total >= 45) {
    return "D";
  } else if (total >= 40) {
    return "E";
  } else {
    return "F";
  }
}


function validate(input) {
  const max = Number(input.dataset.max); 
  const value = Number(input.value);

  if (input.value !== "" && value > max) {
    input.value = max; 
    input.classList.add("invalid");
    message.textContent = "That score is too high. The maximum here is " + max + ".";
  } else if (value < 0) {
    input.value = 0;
    input.classList.add("invalid");
    message.textContent = "Scores cannot be negative.";
  } else {
    input.classList.remove("invalid");
    message.textContent = "";
  }
}


function calculateRow(row) {
  const inputs = row.querySelectorAll(".score");
  const totalCell = row.querySelector(".total");
  const gradeCell = row.querySelector(".grade");

  let total = 0;
  let hasAnyScore = false;

  inputs.forEach(function (input) {
    if (input.value !== "") {
      hasAnyScore = true;
    }
    
    total += Number(input.value) || 0;
  });


  if (!hasAnyScore) {
    totalCell.textContent = "-";
    gradeCell.textContent = "-";
    gradeCell.classList.remove("fail");
    return;
  }

  const grade = getGrade(total);
  totalCell.textContent = total;
  gradeCell.textContent = grade;
  gradeCell.classList.toggle("fail", grade === "F"); 
}


scoreInputs.forEach(function (input) {
  input.addEventListener("input", function () {
    validate(input);


    const row = input.closest("tr");
    calculateRow(row);
  });
});