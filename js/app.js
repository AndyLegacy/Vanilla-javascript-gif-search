$(() => {
  const $loadMore = $('#loadMore');
  const $list = $('ul');
  const $submitButton = $('#submitButton');
  const $search = $('#search');
  let counter = 0;

  function showGifs(data) {
    $list.prepend(`<img src="${data}">`);
  }

  function loadmoreGifs(data) {
    $list.append(`<img src="${data}">`);
  }

  function getGifs() {
    $.ajax({
      url: `http://api.giphy.com/v1/gifs/search?api_key=a6d3ea5cddf84362a8ea33e9b57d4833&q=${$search.val()}&offset=${counter}`,
      method: 'GET',
      contentType: 'application/json'
    })
      .done((response) => {
        response.data.forEach((gif) => {
          if(counter === 0) {
            showGifs(gif.images.fixed_height.url);
          } else {
            loadmoreGifs(gif.images.fixed_height.url);
          }
        });
      });
  }
  $submitButton.on('click', (e) => {
    $list.empty();
    e.preventDefault();
    counter = 0;
    getGifs();

  });

  $loadMore.on('click', (e) => {
    e.preventDefault();
    counter = counter + 25;
    getGifs();


  });
});
