# Trust Member Photos

Optional photos for the "Trust Members" showcase. The names and roles are
already defined in `src/data/members.ts`; adding a photo here replaces the
initial-avatar placeholder for that member.

## Naming

Name each file with the member's **number** (as listed in `members.ts`) as the
leading digits:

```
NN_any-description.jpg      (jpg | jpeg | png | webp)
```

Examples:
```
01_kripa-shankar-singh.jpg   -> member #1  (IPS कृपा शंकर सिंह)
04_santosh-acharya.jpg       -> member #4  (डॉ. संतोष आचार्य)
20_mamta-singh.jpg           -> member #20 (ममता सिंह)
```

Only the leading number matters for matching; the rest of the filename is free.
Square/portrait photos crop best (they're shown in circular frames). Add files
and push — the site rebuilds and shows them automatically.
