using System;
using System.Reflection;
using System.Linq;

var openApiAsm = Assembly.Load("Microsoft.OpenApi");
var types = new string[] { "OpenApiSecuritySchemeReference" };

foreach(var tname in types) {
    var type = openApiAsm.GetTypes().FirstOrDefault(t => t.Name == tname);
    if (type != null) {
        Console.WriteLine($"\n--- Properties of {tname} ---");
        foreach(var prop in type.GetProperties()) {
            Console.WriteLine($"{prop.Name} ({prop.PropertyType.Name})");
        }
        Console.WriteLine($"\n--- Constructors of {tname} ---");
        foreach(var meth in type.GetConstructors()) {
            Console.WriteLine($"{meth.Name}({string.Join(", ", meth.GetParameters().Select(p => p.ParameterType.Name + " " + p.Name))})");
        }
    }
}
