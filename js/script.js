let totalProgress = 0;
let timerId = 0;
const plusOne = 1;

function reset() {
  clearInterval(timerId);
  timerId = 0;
  $("#button-bonus").prop( "disabled",false);
}

function refreshProgressbar(value)
{
  $("#my-progressbar").width(value + '%');
  $("#progress-percent").text(value + '%');
}

function disableButtons(status)
{
  $("#button-plus1").prop("disabled",status);
  $("#button-plus3").prop("disabled",status);
  $("#button-plus7").prop("disabled",status);
}

function classControl()
{
  if($("#my-progressbar").hasClass("bg-danger"))
    $("#my-progressbar").removeClass("bg-danger");
  if($("#my-progressbar").hasClass("bg-warning"))
    $("#my-progressbar").removeClass("bg-warning");
  if($("#my-progressbar").hasClass("bg-success"))
    $("#my-progressbar").removeClass("bg-success");

  if (totalProgress <= 50)
    $("#my-progressbar").addClass("bg-danger");
  else if(totalProgress <= 75)
    $("#my-progressbar").addClass("bg-warning");
  else
    $("#my-progressbar").addClass("bg-success");
}

function handleButton(event)
{
  let percentage;
  if(event.target.id == "button-plus1")
    percentage = 1;
  else if(event.target.id == "button-plus3")
    percentage = 3;
  else
    percentage = 7;
  totalProgress+=percentage;
  if(totalProgress >= 100)
  {
    totalProgress = 100;
    disableButtons(true);
  }
  refreshProgressbar(totalProgress);
  classControl();
}

function goProgressbar()
{
    if(totalProgress != 100) {
      totalProgress++;
      refreshProgressbar(totalProgress);
      classControl();
    }
    else{
      reset();
    }
}

function runInterval()
{
  timerId = setInterval(goProgressbar,100);
}

function handleButtonBonus()
{
  handleButtoRefresh();
  $("#button-bonus").prop("disabled",true);
  disableButtons(true);
  setTimeout(runInterval,500)
}

function handleButtoRefresh() {
  if(timerId !== 0)
    reset();
  totalProgress = 0;
  refreshProgressbar(totalProgress);
  classControl();
  disableButtons(false);
}

function init() {
  $("#button-plus1").click(handleButton);
  $("#button-plus3").click(handleButton);
  $("#button-plus7").click(handleButton);
  $("#button-bonus").click(handleButtonBonus);
  $("#button-refresh").click(handleButtoRefresh);
}

$(document).ready(init);