var AppModel = Backbone.Model.extend({
  initialize: function() {
    this.set('n',3);
    this.set('numBombs', 2);
    this.set('grid', new Grid());
    this.populateGrid();
  },

  populateGrid: function() {
    // adding empty cells to grid
    var n = this.get('n');
    grid = this.get('grid');
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        grid.add(new GridCell({isBomb: false, surrBombs: 0, position: {row:i, col:j}}));
      }
    }
    // helper function to go from row, col to index in collection
    var findIndex = function(r, c, n) {
      var createGrid = function(n) {
        var result = [];
        var counter = 0;
        for (var i = 0; i < n; i++) {
          var row = [];
          for (var j = 0; j < n; j++) {
            row.push(counter++);
          }
          result.push(row);
        }
        return result;
      };
      var grid = createGrid(n);
      console.log(r, c)
      return grid[r][c];
    };

    var incrementBombCount = function(x, y) {
      for (var i = Math.max(0,x-1); i <= Math.min(n-1,x+1); i++) {
        for (var j = Math.max(0,y-1); j <= Math.min(n-1,y+1); j++) {
          var idx = findIndex(i, j, n);
          if (idx === -1) {
            continue;
          }
          var gridCell = grid.at(idx);
          gridCell.set('surrBombs', gridCell.get('surrBombs') + 1);
        }
      }
    };

    // add bombs to grid
    var numBombs = this.get('numBombs');
    for (var i = 0; i < numBombs; i++) {
      var rand = Math.floor(Math.random() * n * n);
      bombCell = grid.at(rand);
      console.dir(bombCell);
      bombCell.set('isBomb', true);
      incrementBombCount(bombCell.get('position').row, bombCell.get('position').col);
    }
  },

});