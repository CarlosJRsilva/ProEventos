using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contextos;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Persistence
{
  public class PalestrantePersist : IPalestrantePersist
  {
    //Injetar o contexto dentro da persistência
    private readonly ProEventosContext _context;
    public PalestrantePersist(ProEventosContext context)
    {
       _context = context;
//       _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
    } 
 
    public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool includeEventos)
    {
       IQueryable<Palestrante> query = _context.Palestrantes
          .Include(p=> p.RedesSociais);

          if (includeEventos)
          {
            query = query
                .Include( p => p.PalestrantesEventos)
                .ThenInclude(pe => pe.Evento);
          }
          query = query.AsNoTracking().OrderBy(p => p.Id)
                        .Where(e => e.Nome.ToLower().Contains(nome.ToLower()));

       return await query.ToArrayAsync();
  }

  public async Task<Palestrante> GetPalestranteByIdAsync(int palestranteId, bool includeEventos)
    {
       IQueryable<Palestrante> query = _context.Palestrantes
          .Include(p=> p.RedesSociais);

          if (includeEventos)
          {
            query = query
                .Include( p => p.PalestrantesEventos)
                .ThenInclude(pe => pe.Evento);
          }
          query = query.AsNoTracking().OrderBy(p => p.Id)
                        .Where(p => p.Id == palestranteId);

       return await query.FirstOrDefaultAsync();
    }

    public async Task<Palestrante[]> GetAllPalestrantesAsync(bool includeEventos = false)
    {
       IQueryable<Palestrante> query = _context.Palestrantes
            .Include(p=> p.RedesSociais);

            if (includeEventos)
            {
              query = query
                .Include( p => p.PalestrantesEventos)
                .ThenInclude(pe => pe.Evento);
            }
            query = query.AsNoTracking().OrderBy(p => p.Id);

            return await query.ToArrayAsync();
    }
  }
}