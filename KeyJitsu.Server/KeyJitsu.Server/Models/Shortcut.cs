using System;

namespace KeyJitsu.Server.Models
{
    public class Shortcut
    {
        public double Priority { get; }
        public string Name { get; }
        public string Keys { get; }

        public Shortcut(double priority, string name, string keys)
        {
            Priority = priority;
            Name = name;
            Keys = keys;
        }
    }

}
