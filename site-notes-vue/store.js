export function Store() {
  let data = {
    user: {
      name: "Джон Джонсон"
    },
    template: [ "Замечательный список", "Великолепная заметка", "То, что надо", "Не густо, но и не пусто", "Два-три слова" ],
    notes: [
      {
        id: 0,
        category: "Покупки",
        name: "Список продуктов на завтра",
        text: "Хлеб, молоко, яйца, сыр, колбаса, огурцы, помидоры, салат, майонез, сметана.",
        date: "04.02.2023"
      },
      {
        id: 1,
        category: "Работа",
        name: "Задачи на следующую неделю",
        text: "Закончить отчет по проекту А, начать работу над проектом Б, созвониться с клиентом В, подготовить презентацию для руководства.",
        date: "12.03.2023"
      },
      {
        id: 2,
        category: "Здоровье",
        name: "Советы по питанию",
        text: "Есть больше фруктов и овощей, пить достаточно воды, избегать жирной и сладкой еды, употреблять меньше соли и специй.",
        date: "18.04.2023"
      }
    ]
  }

  function get(what) {
    return data[what];
  }
  function edit(where, what) {
    data[where] = what;
  }
  function add(where, what) {
    data[where].push(what);
  }
  function del(where, id) {
    let newData = data[where].filter((item) => { return item.id != id; });
    data[where] = newData;
  }
  function print() {
    console.log(data);
  }

  return { get, edit, add, del, print }
}