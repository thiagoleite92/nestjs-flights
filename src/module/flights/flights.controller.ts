import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PilotGuard } from '../auth/pilot-role.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enums/role.enum';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Request } from 'express';

@UseGuards(JwtAuthGuard, PilotGuard)
@Controller('/api/flight')
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  @Post()
  @Roles(Role.PILOT)
  async saveFlight(@Body() createFlightDto: CreateFlightDto): Promise<string> {
    return this.flightsService.saveFlight(createFlightDto);
  }

  @Patch(':flightId')
  @Roles(Role.PILOT)
  async updateFlight(
    @Req() req: Request,
    @Param('flightId') flightId: string,
    @Body() updateFlightDto: UpdateFlightDto,
  ): Promise<string> {
    const { routeId } = updateFlightDto;

    const { id: pilotId } = req.user;

    return this.flightsService.updateFlight(flightId, routeId, pilotId);
  }

  @Delete(':flightId')
  @Roles(Role.PILOT)
  async deleteFlight(
    @Req() req: Request,
    @Param('flightId') flightId: string,
  ): Promise<void> {
    const { id: pilotId } = req.user;

    return this.flightsService.deleteFlight(flightId, pilotId);
  }
}
