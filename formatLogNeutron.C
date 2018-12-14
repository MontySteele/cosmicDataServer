/*

  104 -1 -1 Fri Oct 12 15:30:08 2018

  2016_08_08__20_35_03
  Coincidence Counter
  86
  75

*/
#define BUFFSIZE 1024

#include <stdio.h>
int countlines (FILE *fin);

void formatLog() {

  int counts;
  int muons;
  int neutrons;
  char year[255];
  char month[255];
  char day[255];
  char hour[255];
  char weekday[255];

  FILE *f1 = fopen(Form("%s", "all.dat"), "r");
  if (f1 == NULL) {
    printf("Cannot find file all.dat\n");
    return;
  }

  FILE *f2 = fopen(Form("%s", "logAll.dat"), "w+");
  if (f2 == NULL) {
    printf("Cannot find file logAll.dat\n");
    return;
  }

  int nLines = countlines(f1);
  
  fscanf(f1, "%d %d %d %s %s %s %s %s", &counts, &muons, &neutrons, weekday, month, day, hour, year);

  for(i = 0; i <= strlen(hour); i++)
  	{
	  if(hour[i] == ':')  
		{
  			hour[i] = '_';
 		}
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
  
  fprintf(f2, "%s_%s_%s__%s\n", year, month, day, hour);
  fprintf(f2, "%d\n", neutrons);

  while (1) {
    counts = 0;
    fscanf(f1, "%d %d %d %s %s %s %s %s", &counts, &muons, &neutrons, weekday, month, day, hour, year);
    fprintf(f2, "%d\n", neutrons);
    if(feof(f1)) break;
  }
 

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
