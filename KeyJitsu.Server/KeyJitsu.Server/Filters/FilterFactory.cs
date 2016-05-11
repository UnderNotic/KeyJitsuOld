using System;
using System.Collections.Generic;

namespace KeyJitsu.Server.Filters
{
    public interface IFilterFactory
    {
        T GetFilter<T>() where T: IFilter, new();
    }

    public class FilterFactory : IFilterFactory
    {
        private IDictionary<Type, Predicate<object>> _funcDict;

        public T GetFilter<T>() where T : IFilter, new()
        {
            return new T();
        }
    }
}