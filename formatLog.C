
#define BUFFSIZE 1024
#include <stdio.h>
#include <string.h>
#include <time.h>

#include <stdio.h>
int countlines (FILE *fin);
void hourlyData (FILE *min );
float getMeanCounts(FILE *target, int retval);
void dataFormat(FILE *hourly);

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

  int countsFlag = 0;
  int currentRead = 0;
  while (1) {
    counts = 0;
    fscanf(f1, "%d %d %d %s %s %s %s %s", &counts, &muons, &neutrons, weekday, month, day, hour, year);

    for(int j = 0; j <= strlen(hour); j++){
      if (hour[j] == ':') hour[j] = ' ';
    }

    if (counts > 500) {
      countsFlag = 1;
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
    currentRead++;
    
    if(feof(f1)) break;
    if (currentRead > nLines*2) {
      printf("You have read twice as many lines as should exist in this file! Check that there is an EOF character!\n");
      break;
    }
  }

  if (countsFlag == 1) printf("You had over 500 counts in 1 minute! This is assumed to be an error; those data points have been skipped.\n");

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
  if (f6 == NULL) {
    printf("Cannot find file allFormat.dat\n");
    return 0;
  }

  hourlyData(f6);


  FILE *f7 = fopen("allFormatHourly.dat", "r");
  if (f7 == NULL) {
    printf("Cannot find file allFormat.dat\n");
    return 0;
  }

  dataFormat(f7);

  fclose(f7);

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
  int minutesCounted = 0;;

  FILE *hourly = fopen("allFormatHourly.dat", "w+");
  if (hourly == NULL) {
    printf("Cannot find file allFormatHourly.dat\n");
  }

  fscanf(min, "%d %d %d %s %s %s %s %s %s %s", &counts, &muons, &neutrons, weekday, month, day, hour, minute, second, year);
  // printf("%d %d %d %s %s %s %s %s %s %s\n", counts, muons, neutrons, weekday, month, day, hour, minute, second, year);
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

      if (minutesCounted == 59) fprintf(hourly, "%d %d %d %s %s %s %s %s %s %s\n", countsHold, muonsHold, neutronsHold, weekdayHold, monthHold, dayHold, hourHold, minuteHold, secondHold, yearHold);

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
      minutesCounted = 0;

    }
    // Normal events, store data for this hour
    else {
      countsHold += counts;
      muonsHold += muons;
      neutronsHold += neutrons;
      minutesCounted++;
    }

    if(feof(min)) break;
  }
  fclose(hourly);
}

//need filename and which column
float getMeanCounts(FILE *target, int retval) {

  // printf("Target rewound!\n");

  if (target == NULL) {
    printf("Cannot find target for mean counts\n");
  }
  else rewind(target);

  char year[255];
  char month[255];
  char day[255];
  char hour[255];
  char minute[255];
  char second[255];
  char weekday[255];


  float counts = 0;
  float muonCounts = 0;
  float neutronCounts = 0;

  float countHold;
  float muonHold; 
  float neutronHold;
  int i=0;


  while(1) {
    fscanf(target, "%f %f %f %s %s %s %s %s %s %s", &countHold, &muonHold, &neutronHold, weekday, month, day, hour, minute, second, year);

    //   printf("total: %f, muons:%f, neutrons:%f\n", countHold, muonHold, neutronHold);
 
    counts = counts + ((countHold - counts)/(i+1));
    muonCounts = muonCounts + ((muonHold - muonCounts)/(i+1));
    neutronCounts = neutronCounts + ((neutronHold - neutronCounts)/(i+1));
    i++;

    //  printf("total: %f, muons:%f, neutrons:%f\n", counts, muonCounts, neutronCounts);

    if(feof(target)) break;
  }

  if (retval==1) return counts;
  if (retval==2) return muonCounts;
  if (retval==3) return neutronCounts;
}

void dataFormat(FILE *hourly){

  FILE *formatted = fopen("afterJS.dat", "w+");
  if (formatted == NULL) {
    printf("Cannot find file afterJS.dat\n");
  }

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
  int minutesCounted = 0;

  float meanCounts = getMeanCounts(hourly, 1);
  // printf("all %f\n", meanCounts);
  float meanMuons = getMeanCounts(hourly, 2);
  // printf("muon %f\n", meanMuons);
  float meanNeutrons = getMeanCounts(hourly, 3);
  // printf("neutron %f\n", meanNeutrons);
  // printf("total: %f, muons:%f, neutrons:%f\n", meanCounts, meanMuons, meanNeutrons);

  float percChange;
  float muonPercChange;
  float neutronPercChange;

  //Now I want to simulate the moving average, but my code only works one line at a time.
  rewind(hourly);
  int arraySize = countlines(hourly);
  // printf("size %d\n", arraySize);

  int countsArray[arraySize];
  int countsArrayMuon[arraySize];
  int countsArrayNeutron[arraySize];
  int i = 0;

  float smaArray[arraySize];
  float smaArrayMuon[arraySize];
  float smaArrayNeutron[arraySize];

  float x;
  float y;
  float z;
  int buffer = 6;
  int j = 0;
  int k;

 
  // One section for the normal events, one for when the hour changes
  while (1) {
   
    fscanf(hourly, "%d %d %d %s %s %s %s %s %s %s", &counts, &muons, &neutrons, weekday, month, day, hour, minute, second, year);
    //  printf("total: %d, muons:%d, neutrons:%d\n", counts, muons, neutrons);

    percChange = (100)*((float) counts/meanCounts) - 100;
    muonPercChange = (100)*((float) muons/meanMuons) - 100;
    neutronPercChange = (100)*((float) neutrons/meanNeutrons) - 100;

    countsArray[i] = percChange;
    countsArrayMuon[i] = muonPercChange;
    countsArrayNeutron[i] = neutronPercChange;

    // printf("total: %f, muons:%f, neutrons:%f\n", percChange, muonPercChange, neutronPercChange);

    if(j<buffer){
      x = 0;
      y = 0;
      z = 0;
      for(k = 0;k<j;k++){
	x = x + countsArray[j-k];
	y = y + countsArrayMuon[j-k];
	z = z + countsArrayNeutron[j-k];
      }
      smaArray[j] = (x/j);
      smaArrayMuon[j] = (y/j);
      smaArrayNeutron[j] = (z/j);
    }else{
      x = 0;
      y = 0;
      z = 0;
      for(k = 0;k<buffer;k++){
	x = x + countsArray[j-k];
	y = y + countsArrayMuon[j-k];
	z = z + countsArrayNeutron[j-k];
      }
      smaArray[j] = (x/buffer);
      smaArrayMuon[j] = (y/buffer);
      smaArrayNeutron[j] = (z/buffer);
    }
    if (j > 0) fprintf(formatted, "%f %f %f %s %s %s %s %s %s %s\n", smaArray[j], smaArrayMuon[j], smaArrayNeutron[j], weekday, month, day, hour, minute, second, year);

    i++;
    j++;
    if(feof(hourly)) break;
  }

  // printf("%f %f %f %s %s %s %s %s %s %s\n", smaArray[j], smaArrayMuon[j], smaArrayNeutron[j], weekday, month, day, hour, minute, second, year);
  

 

  fclose(formatted);

}
