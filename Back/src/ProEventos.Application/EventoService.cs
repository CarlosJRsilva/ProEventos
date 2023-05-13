using System;
using System.Threading.Tasks;
using ProEventos.Application.Contratos;
using ProEventos.Domain;
using ProEventos.Persistence.Contratos;

namespace ProEventos.Application
{
  public class EventoService : IEventoService
  {
    private readonly IGeralPersist _geralPersist;
    private readonly IEventoPersist _eventoPersist;
    public EventoService(IGeralPersist geralPersist, IEventoPersist eventoPersist)
    {
        _eventoPersist= eventoPersist;   
        _geralPersist = geralPersist;
    }
    public async Task<Evento> AddEventos(Evento model)
    {
      try
        {
            _geralPersist.Add<Evento>(model);
            if (await _geralPersist.SaveChangesAsync())
            {
              return await _eventoPersist.GetEventoByIdAsync(model.Id, false);      
            }

            return null;
        }    
        catch (Exception ex)
        {
            throw new Exception(ex.Message);     
        }
    }

    public async Task<bool> DeleteEvento(int eventoId)
    {
      try
      {
        var evento = await _eventoPersist.GetEventoByIdAsync(eventoId, false);
        if (evento == null) throw new Exception("Evento para deletar não foi encontrado.");

        return false;
      }  
      catch (Exception ex) 
      {
        throw new (ex.Message);
      }
    }

    public async Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
    {
      try
      {
        var eventos = await _eventoPersist.GetAllEventosAsync(includePalestrantes);
        if (eventos == null) return null;

        return eventos;

      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }  
    }

    public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
    {
      try
      {
        var eventos = await _eventoPersist.GetAllEventosByTemaAsync(tema, includePalestrantes);
        if (eventos == null) return null;
        return eventos;    

      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }    
    }

    public async Task<Evento> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false)
    {
      try
      {
        var eventos = await _eventoPersist.GetEventoByIdAsync(eventoId, includePalestrantes);
        if (eventos == null) return null;
        return eventos;    

      }
      catch (Exception ex)
      {
        throw new Exception(ex.Message);
      }    
    }

    public Task<Evento> UpdateEvento(int eventoId, Evento model)
    {
      throw new NotImplementedException();
    }
  }
}