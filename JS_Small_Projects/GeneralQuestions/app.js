const Questions = [
  {
    id: 1,
    title: "Do you know about python",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "Do you know about Javascript",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 3,
    title: "Do you know about c++",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
];

const sectionContainer = document.querySelector(".section-center");
const sectionTemplate = document.querySelector("template");



const showQuestions = () => {

  Questions.forEach((curElem) => {
    
    const { title, desc } = curElem;
    const questionClone = document.importNode(sectionTemplate.content, true);

    questionClone.querySelector(".qtitle").textContent = title;
    questionClone.querySelector(".question-text").textContent = desc;

    sectionContainer.append(questionClone);
  });
};


showQuestions();
const ques = document.querySelectorAll(".question");

ques.forEach((question)=> {
  console.log(question)
  const btn = question.querySelector(".question-btn");

  btn.addEventListener("click", function () {


    ques.forEach(function (item) {
      if (item !== question) {
        item.classList.remove("show-text");
      }
    });

    question.classList.toggle("show-text");
  });
});
