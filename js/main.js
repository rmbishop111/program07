var app1 = angular.module('app1', []);

app1.controller('ctrl1', function ($scope) {

  $scope.fDegree;

  $scope.updateValue = function () {
    $scope.calculation = ((+$scope.fDegree - 32) / 1.8);
  };
});

app1.controller('ctrl2', function ($scope) {

  $scope.a;
  $scope.b;
  $scope.c;

  $scope.solveQuad = function () {
    var a = $scope.a;
    var b = $scope.b;
    var c = $scope.c;
    var a2 = 2 * a;
    var ac = 4 * a * c;
    var dis = b * b;
    var dis = dis - ac;
    if (dis < 0) {
      document.getElementById("eq").innerHTML = 'No real roots exist for the equation:  ' + a + 'x&#178; + ' + b + 'x + ' + c + ' because discriminant < 0<br />Discriminant  = ' + dis + ' <br />The Equation = ' + a + 'x&#178; + ' + b + 'x + ' + c + '<br />';
      document.getElementById("x1").innerHTML = '&nbsp; ';
      document.getElementById("x2").innerHTML = '&nbsp; ';
    } else {
      var dis_sqrt = Math.sqrt(dis);
      var x1 = -b + dis_sqrt;
      var x1 = x1 / a2;
      var x2 = -b - dis_sqrt;
      var x2 = x2 / a2;
      document.getElementById("eq").innerHTML = " Equation = " + a + "x&#178; + " + b + "x + " + c + "<br />";
      document.getElementById("x1").innerHTML = 'x1 = ' + x1.toFixed(2);
      document.getElementById("x2").innerHTML = 'x2 = ' + x2.toFixed(2);
    }

  };

});

app1.controller('ctrl3', function ($scope) {

  $scope.aCubic;
  $scope.bCubic;
  $scope.cCubic;
  $scope.dCubic;

  $scope.solveCubic = function () {
    var a = $scope.aCubic;
    var b = $scope.bCubic;
    var c = $scope.cCubic;
    var d = $scope.dCubic;

    if (Math.abs(a) < 1e-8) { // Quadratic case, ax^2+bx+c=0
      a = b;
      b = c;
      c = d;
      if (Math.abs(a) < 1e-8) { // Linear case, ax+b=0
        a = b;
        b = c;
        if (Math.abs(a) < 1e-8) // Degenerate case
          return [];
        return [-b / a];
      }

      var D = b * b - 4 * a * c;
      if (Math.abs(D) < 1e-8)
        return [-b / (2 * a)];
      else if (D > 0)
        return [(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)];
      return [];
    }

    // Convert to depressed cubic t^3+pt+q = 0 (subst x = t - b/3a)
    var p = (3 * a * c - b * b) / (3 * a * a);
    var q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
    var roots;

    if (Math.abs(p) < 1e-8) { // p = 0 -> t^3 = -q -> t = -q^1/3
      roots = [cuberoot(-q)];
    } else if (Math.abs(q) < 1e-8) { // q = 0 -> t^3 + pt = 0 -> t(t^2+p)=0
      roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
    } else {
      var D = q * q / 4 + p * p * p / 27;
      if (Math.abs(D) < 1e-8) { // D = 0 -> two roots
        roots = [-1.5 * q / p, 3 * q / p];
      } else if (D > 0) { // Only one real root
        var u = cuberoot(-q / 2 - Math.sqrt(D));
        roots = [u - p / (3 * u)];
      } else { // D < 0, three roots, but needs to use complex numbers/trigonometric solution
        var u = 2 * Math.sqrt(-p / 3);
        var t = Math.acos(3 * q / p / u) / 3; // D < 0 implies p < 0 and acos argument in [-1..1]
        var k = 2 * Math.PI / 3;
        roots = [u * Math.cos(t), u * Math.cos(t - k), u * Math.cos(t - 2 * k)];
      }
    }

    // Convert back from depressed cubic
    for (var i = 0; i < roots.length; i++)
      roots[i] -= b / (3 * a);

      document.getElementById("cubicFormula").innerHTML = 'Cubic Formula: ' + a + "x&#179; + " + b + "x&#178 + " + c + " x + " + d;
      document.getElementById("roots").innerHTML = roots;
    return roots;
  };



});