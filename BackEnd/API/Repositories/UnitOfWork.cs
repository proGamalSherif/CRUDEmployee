using API.Interfaces;
using API.Models;

namespace API.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        private IEmployeeRepository _employeeRepository;

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }

        public IEmployeeRepository EmployeeRepository
            => _employeeRepository ??= new EmployeeRepository(_context);

        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
