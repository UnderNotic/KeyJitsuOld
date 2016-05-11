using System.Collections.Generic;

namespace KeyJitsu.Server.Filters
{
    public interface IFilter
    {
    }
    public interface IFilter<in T>
    {
        bool FilterPredicate(T t);
    }
}
