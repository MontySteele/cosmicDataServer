
#define BUFFSIZE 1024
#include <stdio.h>
#include <string.h>
#include <time.h>

#include <stdio.h>
int countlines (FILE *fin);
void hourlyData (FILE *min );

int yearInt;
int monthInt;
int dayInt;
int hourInt;
int minuteInt;
int secondInt;

time_t conv(void)
{
  time_t retval=0;
  struct tm tm;
  tm.tm_mday=dayInt;
  tm.tm_mon=monthInt - 1;
  tm.tm_year=yearInt - 1900;
  tm.tm_hour=hourInt;
  tm.tm_min=minuteInt;
  tm.tm_sec=secondInt;
  tm.tm_isdst=-1;
  retval=mktime(&tm);
  return retval;
}


//void formatLog() {
int main() {

  int counts;
  int muons;
  int neutrons;
  char year[255];
  char month[255];
  char day[255];
  char hour[255];
  char minute[255];
  char second[255];
  char weekday[255];
  int i;

  long currTime, oldTime;
  int diffOffset=0;

  FILE *f1 = fopen("all.dat", "r");
  if (f1 == NULL) {
    printf("Cannot find file all.dat\n");
    return 0;
  }

  FILE *f2 = fopen("logAll.dat", "w+");
  if (f2 == NULL) {
    printf("Cannot find file logAll.dat\n");
    return 0;
  }

  FILE *f3 = fopen("allFormat.dat", "w+");
  if (f2 == NULL) {
    printf("Cannot find file allFormat.dat\n");
    return 0;
  }

  int nLines = countlines(f1);
  
  fscanf(f1, "%d %d %d %s %s %s %s %s", &counts, &muons, &neutrons, weekday, month, day, hour, year);

  for(i = 0; i <= strlen(hour); i++) if(hour[i] == ':') hour[i] = ' ';

  if (strcmp(month,"Jan") == 0) strcpy(month, "1");
  if (strcmp(month,"Feb") == 0) strcpy(month, "2");
  if (strcmp(month,"Mar") == 0) strcpy(month, "3");
  if (strcmp(month,"Apr") == 0) strcpy(month, "4");
  if (strcmp(month,"May") == 0) strcpy(month, "5");
  if (strcmp(month,"Jun") == 0) strcpy(month, "6");
  if (strcmp(month,"Jul") == 0) strcpy(month, "7");
  if (strcmp(month,"Aug") == 0) strcpy(month, "8");
  if (strcmp(month,"Sep") == 0) strcpy(month, "9");
  if (strcmp(month,"Oct") == 0) strcpy(month, "10");
  if (strcmp(month,"Nov") == 0) strcpy(month, "11");
  if (strcmp(month,"Dec") == 0) strcpy(month, "12");
  
  fprintf(f2, "%s_%s_%s__%s\n", year, month, day, hour);
  fprintf(f2, "%d\n", counts);

  fprintf(f3, "%d %d %d %s %s %s %s %s\n", counts, muons, neutrons, weekday, month, day, hour, year);

  while (1) {
    counts = 0;
    fscanf(f1, "%d %d %d %s %s %s %s %s", &counts, &muons, &neutrons, weekday, month, day, hour, year);

    for(int j = 0; j <= strlen(hour); j++){
      if (hour[j] == ':') hour[j] = ' ';
    }

    if (counts > 9000) {
      printf(" You had over 9000 counts in 1 minute! This is assumed to be an error; that data point has been skipped.\n");
      continue;
    }
    if (strcmp(month,"Jan") == 0) strcpy(month, "1");
    if (strcmp(month,"Feb") == 0) strcpy(month, "2");
    if (strcmp(month,"Mar") == 0) strcpy(month, "3");
    if (strcmp(month,"Apr") == 0) strcpy(month, "4");
    if (strcmp(month,"May") == 0) strcpy(month, "5");
    if (strcmp(month,"Jun") == 0) strcpy(month, "6");
    if (strcmp(month,"Jul") == 0) strcpy(month, "7");
    if (strcmp(month,"Aug") == 0) strcpy(month, "8");
    if (strcmp(month,"Sep") == 0) strcpy(month, "9");
    if (strcmp(month,"Oct") == 0) strcpy(month, "10");
    if (strcmp(month,"Nov") == 0) strcpy(month, "11");
    if (strcmp(month,"Dec") == 0) strcpy(month, "12");
    
   
    fprintf(f2, "%d\n", counts);

    fprintf(f3, "%d %d %d %s %s %s %s %s\n", counts, muons, neutrons, weekday, month, day, hour, year);
    
    if(feof(f1)) break;
  }

  fclose(f1);
  fclose(f2);
  fclose(f3);

  FILE *f4 = fopen("allFormat.dat", "r");
  if (f2 == NULL) {
    printf("Cannot find file allFormat.dat\n");
    return 0;
  }

  FILE *f5 = fopen("allPlot.dat", "w+");
  if (f2 == NULL) {
    printf("Cannot find file allPlot.dat\n");
    return 0;
  }
  
  fscanf(f4, "%d %d %d %s %d %d %d %d %d %d", &counts, &muons, &neutrons, weekday, &monthInt, &dayInt, &hourInt, &minuteInt, &secondInt, &yearInt); //skip firstline

  fprintf(f5, "%d\n", counts);
  oldTime = conv();

  long diff;
  
  while (1) {
    counts = 0;
    fscanf(f4, "%d %d %d %s %d %d %d %d %d %d", &counts, &muons, &neutrons, weekday, &monthInt, &dayInt, &hourInt, &minuteInt, &secondInt, &yearInt);
    currTime = conv();

    while (1) {

      diff = currTime - oldTime - diffOffset;
    
      if (diff > 80) {
	fprintf(f5, "0\n");
	diffOffset+=60;
	//	printf("I just printed a zero\n");
	//	printf("diff is %ld currTime is %ld oldTime is %ld\n", diff, currTime, oldTime);
	continue;
      }
      else break;

    }
    diffOffset=0; 
   
    fprintf(f5, "%d\n", counts);

    oldTime = currTime;
    
    if(feof(f4)) break;
  }

  fclose(f4);
  fclose(f5);
  
  FILE *f6 = fopen("allFormat.dat", "r");
  if (f2 == NULL) {
    printf("Cannot find file allFormat.dat\n");
    return 0;
  }

  hourlyData(f6);
  fclose(f6);
  
}

int countlines (FILE *fin)
{
  int  nlines  = 0;
  char line[BUFFSIZE];

  while(fgets(line, BUFFSIZE, fin) != NULL)  nlines++;
  //  printf("%d lines\n", nlines);
  rewind(fin);
  return nlines;
}

void hourlyData (FILE *min )
{

  //Variables
  int counts = -2;
  int muons = 0;
  int neutrons = 0;

  int countsHold = 0;
  int muonsHold = 0;
  int neutronsHold = 0;

  char year[255];
  char month[255];
  char day[255];
  char hour[255];
  char minute[255];
  char second[255];
  char weekday[255];

  char yearHold[255];
  char monthHold[255];
  char dayHold[255];
  char hourHold[255];
  char minuteHold[255];
  char secondHold[255];
  char weekdayHold[255];

  FILE *hourly = fopen("allFormatHourly.dat", "w+");
  if (hourly == NULL) {
    printf("Cannot find file allFormatHourly.dat\n");
  }

  fscanf(min, "%d %d %d %s %s %s %s %s %s %s", &counts, &muons, &neutrons, weekday, month, day, hour, minute, second, year);
  printf("%d %d %d %s %s %s %s %s %s %s\n", counts, muons, neutrons, weekday, month, day, hour, minute, second, year);
  strncpy(weekdayHold, weekday, 255);
  strncpy(dayHold, day, 255);
  strncpy(monthHold, month, 255);
  strncpy(hourHold, hour, 255);
  strncpy(yearHold, year, 255);
  strncpy(minuteHold, minute, 255);
  strncpy(secondHold, second, 255);

  // One section for the normal events, one for when the hour changes
  while (1) {

    fscanf(min, "%d %d %d %s %s %s %s %s %s %s", &counts, &muons, &neutrons, weekday, month, day, hour, minute, second, year);

    //Hour changes, print data for the previous hour
    if (strcmp(dayHold, day) || strcmp(monthHold, month) || strcmp(yearHold, year) || strcmp(hourHold, hour) ){
 
      fprintf(hourly, "%d %d %d %s %s %s %s %s %s %s\n", countsHold, muonsHold, neutronsHold, weekdayHold, monthHold, dayHold, hourHold, minuteHold, secondHold, yearHold);

      strncpy(weekdayHold, weekday, 255);
      strncpy(dayHold, day, 255);
      strncpy(monthHold, month, 255);
      strncpy(hourHold, hour, 255);
      strncpy(yearHold, year, 255);
      strncpy(minuteHold, minute, 255);
      strncpy(secondHold, second, 255);

      countsHold = counts;
      muonsHold = muons;
      neutronsHold = neutrons;

    }
    // Normal events, store data for this hour
    else {
      countsHold += counts;
      muonsHold += muons;
      neutronsHold += neutrons;
    }

    if(feof(min)) break;
  }
  fclose(hourly);
}

