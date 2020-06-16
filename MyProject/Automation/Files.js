module.exports.repositoryName  = "CODING";
module.exports.data = [
    {
        "FileName" : "fibonacci.cpp",
        "code" :  '#include <iostream>\nusing namespace std;\nint main()\n{\tint n, t1 = 0, t2 = 1, nextTerm = 0;\n    cout << "Enter the number of terms: ";\n    cin >> n;\n    cout << "Fibonacci Series: ";\n    for (int i = 1; i <= n; ++i)\n    {\n        if(i == 1)\n{\ncout << " " << t1;\n            continue;\n        }\n        if(i == 2)\n        {\n            cout << t2 << " ";\n            continue;\n        }\n        nextTerm = t1 + t2;\n        t1 = t2;\n        t2 = nextTerm;\n        cout << nextTerm << " ";\n    }\n    return 0;\n}'

    },
    {
        "FileName" : "primeNumber.cpp",
        "code" : '#include <iostream>\nusing namespace std;\nint main() {\n   int n, i;\n   bool isPrime = true;\n  cout << "Enter a positive integer: ";\n   cin >> n;\n   for (i = 2; i <= n / 2; ++i) {\n      if (n % i == 0) {\n         isPrime = false;\n         break;\n      }\n   }\n   if (isPrime)\n      cout << n << " is a prime number";\n   else\n      cout << n << " is not a prime number";\n   return 0;\n}'
    },
    {
        "FileName" : "Power.cpp",
        "code" : '#include <iostream>\n#include <cmath>\nusing namespace std;\nint main(){\n    float base, exponent, result;\ncout << "Enter base and exponent respectively:  ";\ncin >> base >> exponent;\nresult = pow(base, exponent);\ncout << base << "^" << exponent << " = " << result;\nreturn 0;\n}'
    }
]

