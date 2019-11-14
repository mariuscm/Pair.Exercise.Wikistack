const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form method="POST" action="/wiki/">

    <div class="form-group">
      <label for="name" class="col-sm-2 control-label">Author</label>
      <div class="col-sm-10">
      <input id="name" name="name" type="text"/>
      </div>
    </div>

    <div class="form-group">
      <label for="email" class="col-sm-2 control-label">Email</label>
      <div class="col-sm-10">
        <input id="email" name="email" type="email"/>
      </div>
    </div>

    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input id="title" name="title" type="text" class="form-control"/>
      </div>
    </div>

    <div>
      <label for="content" class="col-sm-2 control-label">Content</label>
      <textarea rows="20" cols="50" id="content" name="content" type="text"></textarea>
    </div>

    <div>
      <label class="col-sm-2 control-label">Status</label>

      <input type="radio" id="status" name="status" value="open">
      <label for="open">Open</label>

      <input type="radio" id="status" name="status" value="closed" >
      <label for="closed">closed</label>
    </div>

    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">submit</button>
    </div>

  </form>
`);
