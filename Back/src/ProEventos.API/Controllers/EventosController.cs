﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Domain;
using ProEventos.Application.Contratos;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace ProEventos.API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class EventosController : ControllerBase
  {
    private readonly IEventoService _eventoService;
    public EventosController(IEventoService eventoService)
    {
      _eventoService = eventoService;

    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            var eventos = await _eventoService.GetAllEventosAsync(true);
            if (eventos == null) return NotFound("Nenhum evento Encontrado.");

            return Ok(eventos);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, 
            $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var evento = await _eventoService.GetEventoByIdAsync(id, true);
            if (evento == null) return NotFound("Evento por ID não Encontrado.");

            return Ok(evento);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, 
            $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
        }
    }

    [HttpGet("{tema}/tema")]
    public async Task<IActionResult> GetByTema(string tema)
    {
        try
        {
          var evento = await _eventoService.GetAllEventosByTemaAsync(tema, true);
          if (evento == null) return NotFound("Eventos por tema não Encontrado.");

          return Ok(evento);
        }
        catch (Exception ex)
        {
          return this.StatusCode(StatusCodes.Status500InternalServerError, 
          $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> Post(Evento model)
    {
      try
        {
          var evento = await _eventoService.AddEventos(model);
          if (evento == null) return BadRequest("Erro ao tentar adicionar Evento.");

          return Ok(evento);
        }
        catch (Exception ex)
        {
          return this.StatusCode(StatusCodes.Status500InternalServerError, 
          $"Erro ao tentar Adicionar eventos. Erro: {ex.Message}");
        }       
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Evento model)
    {
        try
        {
          var evento = await _eventoService.UpdateEvento(id, model);
          if (evento == null) return BadRequest("Erro ao tentar Atualizar o Evento.");

          return Ok(evento);
        }
        catch (Exception ex)
        {
          return this.StatusCode(StatusCodes.Status500InternalServerError, 
          $"Erro ao tentar Atualizar eventos. Erro: {ex.Message}");
        }       
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      try
      {
        if (await _eventoService.DeleteEvento(id))
          return Ok("Deletado");
        else
          return BadRequest("Evento não deletado.");
      }
      catch (Exception ex)
      {
         return this.StatusCode(StatusCodes.Status500InternalServerError, 
         $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
      }
    }
  }
}
